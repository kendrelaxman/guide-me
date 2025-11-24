import './style.css';

export class GuideMe {
  constructor(steps = [], options = {}) {
    this.steps = steps;
    this.options = {
      persistHints: true, // Default: hints stay after clicking
      runOnce: false,     // Default: tour can be run multiple times
      tourId: 'default-tour', // Unique ID for localStorage
      ...options
    };
    this.currentStepIndex = 0;
    this.isActive = false;
    this.hints = [];
    this.beacons = [];
    this.dismissedHints = new Set(); // Track dismissed hints
    this.mode = 'tour'; // 'tour' or 'hint'

    // Bind methods
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.skip = this.skip.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);

    this.init();
  }

  init() {
    // Create Helper (The highlight box)
    this.helper = document.createElement('div');
    this.helper.className = 'guideme-highlight-helper';
    document.body.appendChild(this.helper);

    // Create Popover
    this.popover = document.createElement('div');
    this.popover.className = 'guideme-popover';
    this.popover.innerHTML = `
      <div class="guideme-header">
        <h3 class="guideme-title"></h3>
        <button class="guideme-close">&times;</button>
      </div>
      <div class="guideme-body"></div>
      <div class="guideme-footer">
        <span class="guideme-steps-count"></span>
        <div class="guideme-buttons">
          <button class="guideme-btn guideme-btn-text" data-action="skip">Skip</button>
          <button class="guideme-btn guideme-btn-secondary" data-action="prev">Prev</button>
          <button class="guideme-btn guideme-btn-primary" data-action="next">Next</button>
        </div>
      </div>
    `;
    document.body.appendChild(this.popover);

    // Event Listeners
    this.popover.querySelector('.guideme-close').addEventListener('click', () => this.skip());
    this.popover.querySelector('[data-action="skip"]').addEventListener('click', () => this.skip());
    this.popover.querySelector('[data-action="prev"]').addEventListener('click', this.prev);
    this.popover.querySelector('[data-action="next"]').addEventListener('click', this.next);

    window.addEventListener('resize', this.handleResize);
    document.addEventListener('keydown', this.handleKeydown);

    // Click outside to dismiss (especially for hints)
    document.addEventListener('click', (e) => {
      if (this.isActive && this.mode === 'hint') {
        // If click is outside popover AND outside any beacon
        if (!this.popover.contains(e.target) && !e.target.classList.contains('guideme-hint-beacon')) {
          this.skip();
        }
      }
    });
  }

  start(force = false) {
    if (this.steps.length === 0) return;

    // Check runOnce
    if (this.options.runOnce && !force) {
      const hasRun = localStorage.getItem(`guideme_tour_${this.options.tourId}`);
      if (hasRun) {
        console.log('GuideMe: Tour already completed/dismissed.');
        return;
      }
    }

    this.isActive = true;
    this.mode = 'tour';
    this.currentStepIndex = 0;
    this.showStep(0);
  }

  addHints(hints) {
    this.hints = hints;
    this.renderHints();
  }

  renderHints() {
    // Clear existing beacons
    this.beacons.forEach(b => b && b.remove());
    this.beacons = [];

    this.hints.forEach((hint, index) => {
      // Skip if dismissed
      if (this.dismissedHints.has(index)) {
        this.beacons.push(null);
        return;
      }

      const target = document.querySelector(hint.element);
      if (target) {
        const beacon = document.createElement('div');
        beacon.className = 'guideme-hint-beacon';

        // Position beacon (top-left of element by default)
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        beacon.style.top = `${rect.top + scrollTop - 10}px`;
        beacon.style.left = `${rect.left + scrollLeft - 10}px`;

        beacon.addEventListener('click', (e) => {
          e.stopPropagation();
          this.showHint(index);
        });

        document.body.appendChild(beacon);
        this.beacons.push(beacon);
      } else {
        this.beacons.push(null);
      }
    });
  }

  showHint(index) {
    this.isActive = true;
    this.mode = 'hint';
    const hint = this.hints[index];
    const target = document.querySelector(hint.element);

    // Handle persistHints
    if (!this.options.persistHints) {
      this.dismissedHints.add(index);
      if (this.beacons[index]) {
        this.beacons[index].style.display = 'none';
      }
    }

    // Update Popover
    this.popover.querySelector('.guideme-title').textContent = hint.title || 'Hint';
    this.popover.querySelector('.guideme-body').textContent = hint.description || '';
    this.popover.querySelector('.guideme-steps-count').style.display = 'none';

    const skipBtn = this.popover.querySelector('[data-action="skip"]');
    const prevBtn = this.popover.querySelector('[data-action="prev"]');
    const nextBtn = this.popover.querySelector('[data-action="next"]');

    skipBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    nextBtn.textContent = 'Got it';
    nextBtn.onclick = () => this.skip(); // Close on click

    if (target) {
      this.positionHelper(target); // Optional: highlight it too?
      this.positionPopover(target, hint.position || 'bottom');
      this.helper.style.opacity = '1';
      this.popover.classList.add('active');
    }
  }

  showStep(index) {
    if (index < 0 || index >= this.steps.length) return;

    this.currentStepIndex = index;
    const step = this.steps[index];
    const target = document.querySelector(step.element);

    // Update Popover Content
    this.popover.querySelector('.guideme-title').textContent = step.title || '';
    this.popover.querySelector('.guideme-body').textContent = step.description || '';

    const countSpan = this.popover.querySelector('.guideme-steps-count');
    countSpan.style.display = 'block';
    countSpan.textContent = `${index + 1} of ${this.steps.length}`;

    // Update Buttons
    const skipBtn = this.popover.querySelector('[data-action="skip"]');
    const prevBtn = this.popover.querySelector('[data-action="prev"]');
    const nextBtn = this.popover.querySelector('[data-action="next"]');

    skipBtn.style.display = 'inline-block';
    prevBtn.style.display = 'inline-block';
    prevBtn.disabled = index === 0;

    nextBtn.textContent = index === this.steps.length - 1 ? 'Done' : 'Next';
    nextBtn.onclick = this.next; // Restore original handler

    // Position Helper & Popover
    if (target) {
      this.positionHelper(target);
      this.positionPopover(target, step.position || 'bottom');
      this.helper.style.opacity = '1';
      this.popover.classList.add('active');

      // Scroll to element
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      console.warn(`GuideMe: Target element '${step.element}' not found.`);
      this.helper.style.opacity = '0';
      this.popover.style.top = '50%';
      this.popover.style.left = '50%';
      this.popover.style.transform = 'translate(-50%, -50%)';
      this.popover.classList.add('active');
    }
  }

  positionHelper(target) {
    const rect = target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    this.helper.style.width = `${rect.width + 10}px`;
    this.helper.style.height = `${rect.height + 10}px`;
    this.helper.style.top = `${rect.top + scrollTop - 5}px`;
    this.helper.style.left = `${rect.left + scrollLeft - 5}px`;
  }

  positionPopover(target, position) {
    const rect = target.getBoundingClientRect();
    const popoverRect = this.popover.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    let top, left;
    const spacing = 15;

    switch (position) {
      case 'top':
        top = rect.top + scrollTop - popoverRect.height - spacing;
        left = rect.left + scrollLeft + (rect.width / 2) - (popoverRect.width / 2);
        break;
      case 'bottom':
        top = rect.bottom + scrollTop + spacing;
        left = rect.left + scrollLeft + (rect.width / 2) - (popoverRect.width / 2);
        break;
      case 'left':
        top = rect.top + scrollTop + (rect.height / 2) - (popoverRect.height / 2);
        left = rect.left + scrollLeft - popoverRect.width - spacing;
        break;
      case 'right':
        top = rect.top + scrollTop + (rect.height / 2) - (popoverRect.height / 2);
        left = rect.right + scrollLeft + spacing;
        break;
      default:
        top = rect.bottom + scrollTop + spacing;
        left = rect.left + scrollLeft + (rect.width / 2) - (popoverRect.width / 2);
    }

    if (left < 10) left = 10;
    if (left + popoverRect.width > window.innerWidth - 10) {
      left = window.innerWidth - popoverRect.width - 10;
    }

    this.popover.style.top = `${top}px`;
    this.popover.style.left = `${left}px`;
  }

  next() {
    if (this.mode === 'tour') {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.showStep(this.currentStepIndex + 1);
      } else {
        this.skip();
      }
    }
  }

  prev() {
    if (this.mode === 'tour' && this.currentStepIndex > 0) {
      this.showStep(this.currentStepIndex - 1);
    }
  }

  skip() {
    // Mark as done if runOnce is enabled and we were in tour mode
    if (this.mode === 'tour' && this.options.runOnce) {
      localStorage.setItem(`guideme_tour_${this.options.tourId}`, 'true');
    }

    this.isActive = false;
    this.helper.style.opacity = '0';
    this.popover.classList.remove('active');
  }

  handleResize() {
    if (this.isActive) {
      if (this.mode === 'tour') {
        this.showStep(this.currentStepIndex);
      }
      this.renderHints();
    }
  }

  handleKeydown(e) {
    if (!this.isActive) return;
    if (this.mode === 'tour') {
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    }
    if (e.key === 'Escape') this.skip();
  }
}
