document.addEventListener('DOMContentLoaded', () => {
    let activeTooltip = null; // Keep track of the active tooltip
  
    const createTooltip = (element) => {
      // If a tooltip is already active, reverse its animation and remove it
      if (activeTooltip) {
        removeTooltip(activeTooltip, true); // Reverse animation before removal
      }
  
      // Create tooltip element
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = element.dataset.tooltip; // Use data-tooltip instead of title
  
      // Position tooltip
      const rect = element.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.bottom + window.scrollY}px`;
  
      // Append tooltip to body
      document.body.appendChild(tooltip);
      activeTooltip = tooltip;
  
      // Trigger fade-in animation
      requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateX(20px)';
      });
    };
  
    const removeTooltip = (tooltip, reverse = false) => {
      if (reverse) {
        // Reverse the animation
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateX(-20px)';
  
        // Remove tooltip after reverse animation ends
        setTimeout(() => {
          if (tooltip.parentElement) tooltip.remove();
          if (activeTooltip === tooltip) activeTooltip = null;
        }, 300); // Match reverse animation duration
      } else {
        // Standard fade-out animation
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateX(-20px)';
  
        // Remove tooltip after animation ends
        setTimeout(() => {
          if (tooltip.parentElement) tooltip.remove();
          if (activeTooltip === tooltip) activeTooltip = null;
        }, 2000); // Match regular animation duration
      }
    };
  
    // Add mouseover and mouseout events to elements with class 'clickable'
    document.querySelectorAll('.clickable').forEach((element) => {
      // Store the title attribute in a data-tooltip attribute
      element.dataset.tooltip = element.getAttribute('title');
      element.removeAttribute('title'); // Disable the default title mouseover behavior
  
      element.addEventListener('mouseover', () => {
        createTooltip(element); // Start the new tooltip
      });
  
      element.addEventListener('mouseout', () => {
        if (activeTooltip) removeTooltip(activeTooltip);
      });
    });
  });
  