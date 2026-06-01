---
name: ux-ui-best-practices
description: "Apply when building, styling, or reviewing any UI in this app — pages, components, layouts, forms, tables, modals, navigation, states (loading/empty/error), motion, or accessibility. Use to keep the interface simple, consistent, accessible, and on-brand, and to audit UI against these standards."
---

# UX/UI Implementation Guidelines for Simple, Polished Web Apps

## Product feel

- Build a web app that feels simple, functional, calm, fast, and deliberately designed.
- The interface should make the next useful action obvious within one second.
- Design for repeated use, not just first impression. Daily actions should be efficient and subtle; rare completion moments can be more delightful.
- Prefer fewer, better components over many decorative sections.
- Every visible state must look intentional: loading, empty, error, disabled, success, selected, focused, hovered, pressed, and offline/network failure states.

## Visual direction

- Infer the visual direction from the product domain before choosing colors, fonts, spacing, or motion.
- Use one primary accent color plus neutrals. Add semantic colors only for success, warning, error, destructive, and informational states.
- Avoid generic AI aesthetics: purple-blue gradients, glowing blobs, gradient buttons, decorative floating shapes, emoji as UI, centered-everything layouts, and identical three-card feature grids.
- Use whitespace, typography, hierarchy, alignment, and component structure as the main design tools.
- Keep the UI mostly neutral. Color should guide attention, not decorate the page.
- Support both light and dark mode from the start. Do not bolt dark mode on afterward.

## Layout and spacing

- Use a 4px spacing system. All margins, padding, gaps, and offsets should map to consistent spacing tokens.
- Use a small set of spacing levels:
  - 4-8px for icon gaps and compact internal spacing.
  - 12-16px for dense component spacing.
  - 20-32px for card, panel, and form spacing.
  - 40-80px for page sections and major layout separation.
- Keep layouts grid-aligned and predictable. Prefer left alignment for app content.
- Use generous page gutters and avoid edge-to-edge content unless it is a deliberate full-bleed media or data view.
- Do not let bordered, elevated, or interactive elements touch each other. Leave visible breathing room.
- Do not change layout on hover. Hover may change color, elevation, opacity, or transform, but not element size or document flow.
- If an element appears on hover, keep it in the DOM and toggle opacity or visibility rather than mounting/unmounting it.
- Use responsive layouts that collapse intentionally:
  - Desktop: sidebar or top navigation, multi-column layouts where useful.
  - Tablet: fewer columns, preserved hierarchy.
  - Mobile: single-column flow, bottom or compact navigation where appropriate, no cramped sidebars.
- Avoid fixed headers, sticky footers, banners, and modals stacking in a way that blocks mobile content.

## Typography

- Choose fonts intentionally based on the product’s tone. Do not default to the same font for every project.
- Prefer high-quality web fonts with `font-display: swap`; use system fonts only as fallbacks.
- Use no more than two font families and two or three weights.
- Use three to five text styles total per screen.
- Body text should usually be 16px. Never render text below 12px.
- App page titles should stay restrained, usually 24-36px. Avoid huge marketing-style hero type inside functional app screens.
- Use line-height around 1.5-1.6 for body copy and 1.15-1.25 for headings.
- Keep readable line length: roughly 45-75 characters for prose.
- Use tabular numbers for metrics, tables, balances, counts, and dashboard values.
- Use text color hierarchy consistently:
  - Primary text for main content.
  - Muted text for secondary details.
  - Faint text for placeholders, metadata, and low-priority hints.

## Color and surfaces

- Define semantic color tokens instead of hardcoding colors throughout components.
- Required color roles:
  - Background.
  - Surface.
  - Elevated surface.
  - Border/divider.
  - Primary text.
  - Muted text.
  - Faint text.
  - Primary/accent.
  - Primary hover.
  - Success.
  - Warning.
  - Error/destructive.
- Use subtle surface layering instead of heavy borders everywhere.
- Use borders only when the background contrast is not enough to separate regions.
- Borders should be soft and low contrast, never harsh default gray.
- Shadows should be subtle, tone-matched, and reserved for floating elements, modals, dropdowns, popovers, and surfaces that need separation.
- Do not use gradient buttons. Prefer solid buttons with clear hover and active states.
- Never rely on color alone to communicate meaning. Pair color with labels, icons, text, or shape.

## Buttons

- Each view should have one clear primary action.
- Use button hierarchy consistently:
  - Primary/filled: the main action on the screen or the final action in a flow.
  - Secondary/outline or tonal: important alternative actions.
  - Ghost/text: low-emphasis actions, especially in cards, toolbars, dialogs, and secondary controls.
  - Destructive: dangerous actions only, visually distinct and usually not the default focus.
- Button labels must be specific verbs: “Create project”, “Send invite”, “Save changes”, “Delete file”.
- Avoid vague labels like “OK”, “Done”, “Submit”, or “Click here” unless the surrounding context makes the result completely obvious.
- Keep button text short, usually two or three words.
- Align button groups by priority:
  - Primary action on the trailing side.
  - Secondary or cancel action before it.
  - Destructive actions separated spatially or visually.
- Do not put too many buttons in one region. Move lower-priority actions into menus, links, or secondary areas.
- Maintain consistent control height in the same row.
- Minimum touch target should be 44x44px for comfortable touch use, even if the visible icon is smaller.
- Icon-only buttons must have accessible names and tooltips where helpful.
- Disabled buttons must explain why the action is unavailable if the reason is not obvious.

## Hover, active, focus, and cursor behavior

- Only interactive elements get hover states. Static cards, headings, badges, and decorative containers should not react to hover.
- Hover should be subtle: slight elevation, background tint, border change, underline reveal, or a 1-2px lift.
- Active/pressed state should feel tactile: slightly reduce elevation, translate down 1px, or scale to about 0.98.
- Do not use large scale effects. Avoid bouncy hover animations for core app controls.
- Always pair hover states with active states.
- Always provide visible `:focus-visible` styles for keyboard users.
- Focus rings must be easy to see and not clipped by overflow.
- Use the correct cursor:
  - Pointer for clickable elements.
  - Default for static content.
  - Grab/grabbing for draggable elements.
  - Not-allowed for unavailable actions.
  - Text cursor for editable text.
- Do not use `cursor: pointer` on non-clickable elements.

## Motion and transitions

- Motion should explain what changed, preserve context, and make the app feel responsive.
- Default interaction transition: about 150-200ms with ease-out.
- Button press feedback: about 100-150ms.
- Tooltip/popover entrance: about 150-200ms.
- Dropdown/sheet entrance: about 250-300ms.
- Modal entrance: about 250-300ms.
- Modal exit: about 150-200ms and faster than entrance.
- Page or route transition: about 200ms out and 300ms in.
- Layout morphs/reorders: about 300-500ms.
- Skeleton shimmer: around 1.5s, subtle and low contrast.
- Use ease-out for entrances and user-triggered feedback.
- Use ease-in only for exits.
- Use ease-in-out for elements already on screen that resize, reorder, or morph.
- Use linear only for progress, scroll-linked motion, continuous rotation, or time-based indicators.
- Never use `transition: all`; list the animated properties.
- Animate transform and opacity when possible. Avoid animating layout-heavy properties like width, height, top, left, margin, and padding.
- Respect `prefers-reduced-motion` and provide a reduced or instant alternative.
- Scroll reveal animations must not cause layout shift. Prefer opacity, clip-path, or filter; avoid translating elements from below if it changes perceived layout.

## Navigation

- Navigation should be consistent, transparent, and easy to predict.
- Users should always know:
  - Where they are.
  - What they can do next.
  - How to go back or exit.
  - What will happen if they click an item.
- Use sidebar navigation for multi-section productivity apps, dashboards, admin tools, and dense workflows.
- Use top navigation for simpler apps with a small number of sections.
- Use breadcrumbs when users can move deeper than one level.
- Keep navigation labels concrete and familiar. Avoid clever names.
- Show the current section visibly.
- Keep destructive or account-level actions away from primary navigation unless they belong in settings.
- Provide keyboard-accessible navigation and logical tab order.

## Forms and inputs

- Every input needs a visible label. Placeholders are examples, not labels.
- Group related fields with clear section headings or fieldsets.
- Prefer progressive disclosure over long intimidating forms.
- Use good defaults, autocomplete, input masks, and constrained controls to prevent errors.
- Validate inline and close to the field.
- Error messages must be specific and actionable: “Enter a valid email address” instead of “Invalid input”.
- Show all validation errors after submission so users can fix them in one pass.
- Do not clear user input after validation failure.
- Keep helper text short and useful.
- Required and optional fields should be obvious.
- For destructive or irreversible actions, require confirmation or provide undo.
- Loading submission states should disable duplicate submissions and show progress near the button that triggered the action.
- Successful submissions should update the UI in place, not only show a toast.

## Modals, dialogs, drawers, and popovers

- Use modals sparingly. They are interruptive and should be reserved for important decisions, focused tasks, confirmations, or blocking alerts.
- Prefer inline expansion, drawers, popovers, or dedicated pages for non-critical tasks.
- Every modal needs:
  - Clear title.
  - Concise description or content.
  - Primary action.
  - Dismiss/cancel action.
  - Escape key support.
  - Outside-click behavior only when safe.
  - Focus trap while open.
  - Focus restored to the triggering element when closed.
- Modal buttons must describe the result: “Discard changes”, “Send invite”, “Create workspace”.
- Avoid vague modal actions like “Yes”, “No”, “OK”, or “Continue” when the consequence is meaningful.
- Keep basic modals narrow and focused.
- Use drawers for contextual editing, filters, details panels, and workflows that benefit from preserving the underlying page.
- Use full-screen dialogs only on small screens or for complex multi-step creation flows.
- Show field errors inside the modal, next to the relevant fields.
- Do not stack multiple modals unless absolutely necessary.

## Cards, panels, lists, and tables

- Cards should group related content and actions, not act as generic decoration.
- Use cards when the content is modular, comparable, or independently actionable.
- Do not nest cards inside cards unless there is a strong reason and clear visual separation.
- Keep card padding consistent across the app.
- Clickable cards must look clickable and have hover, focus, and active states.
- Static cards should not have hover effects.
- Use lists for repeated text-heavy items and tables for structured comparison.
- Tables should support scanning:
  - Clear column labels.
  - Aligned numbers.
  - Sticky header for long tables where useful.
  - Row hover only if rows are interactive or selectable.
  - Empty state when no rows exist.
  - Loading skeleton matching table structure.
- Avoid dense borders in tables. Use whitespace, subtle dividers, and alignment.

## Feedback and system status

- Every user action should produce immediate feedback.
- Show optimistic updates only when rollback is easy and safe.
- Use inline feedback for important results. Toasts are supplementary, not the only confirmation for critical actions.
- Toasts should be brief, non-blocking, and reserved for background confirmations or low-risk updates.
- Long-running actions need progress indication, cancellation where possible, and clear completion/failure states.
- Save states should be visible: unsaved, saving, saved, failed.
- Empty states should explain what belongs there and provide a useful next action.
- Error states should be calm, human, and specific. Never expose raw stack traces or cryptic codes to users.
- 404 and network error pages should provide a route back to a safe place.

## Loading states

- Use skeletons that match the final layout instead of generic spinners for content areas.
- Use spinners only for small, localized, short actions.
- Loading states should appear where the result will appear.
- Avoid layout shift when content loads.
- Preserve previous data while refreshing when possible, with a subtle “updating” indicator.
- Disable only the controls that cannot be used during loading. Do not freeze the entire UI unnecessarily.

## Empty states

- Never show only “No items”.
- Empty states should include:
  - A concise explanation of what will appear here.
  - A primary action to create, import, connect, or fix the empty state.
  - Optional secondary action for learning more.
  - A restrained icon or illustration if it helps.
- Keep empty-state visuals tasteful and quiet. Avoid cartoonish placeholders unless the product tone supports it.

## Error and destructive states

- Prevent errors before they happen with constraints, previews, defaults, and confirmation for high-risk actions.
- Destructive actions should be visually distinct, clearly labeled, and reversible when possible.
- Prefer undo for reversible actions.
- Require confirmation for irreversible or high-impact actions.
- Confirmation copy must name the object and consequence: “Delete ‘Q2 hiring plan’? This cannot be undone.”
- Never make the destructive action the visually dominant default unless the user is already inside a destructive flow.

## Accessibility

- Use semantic HTML before ARIA.
- Use one `h1` per page and a logical heading hierarchy.
- All interactive elements must be reachable and operable by keyboard.
- Support Tab, Enter, Space, Escape, and arrow keys where expected.
- Maintain visible focus indicators.
- Body text contrast must meet WCAG AA contrast. Large text and non-text UI indicators must also have sufficient contrast.
- Do not rely on color alone for status or meaning.
- All images need alt text; decorative images should use empty alt text.
- Icon-only controls need accessible labels.
- Form inputs need associated labels.
- Error messages must be programmatically associated with the relevant fields when possible.
- Interactive targets should be at least 44x44px for touch comfort.
- Respect reduced motion preferences.
- Test at 200% zoom and on mobile width.

## Mobile quality

- Design mobile layouts intentionally, not as squeezed desktop screens.
- Keep primary actions reachable.
- Use bottom sheets or full-screen flows for complex mobile tasks when appropriate.
- Avoid tiny icon-only controls without labels in critical flows.
- Inputs should use the right keyboard type: email, number, tel, URL, search.
- Avoid hover-dependent functionality on touch devices.
- Use `:active` or pressed feedback for touch interactions.
- Ensure sticky elements do not cover form fields, buttons, or important content.

## Performance and implementation quality

- The app should feel fast even during network activity.
- Avoid unnecessary libraries for simple UI effects.
- Lazy-load heavy routes, charts, images, and non-critical panels.
- Use optimized image formats and explicit width/height to avoid layout shift.
- Preconnect to font origins and load only the font weights used.
- Keep initial UI responsive. Avoid blocking the main thread with large synchronous work.
- Use semantic, reusable components.
- Keep design tokens centralized.
- Do not duplicate one-off styles across many components.
- Use stable test IDs or selectors for important interactive elements.
- Ensure all links, buttons, forms, menus, dialogs, and navigation flows work with keyboard and screen readers.

## Content and microcopy

- Use plain language and familiar terms.
- Be specific about the product, user, object, and action.
- Avoid generic SaaS copy like “Unlock your potential”, “All-in-one solution”, “Seamless experience”, or “Empower your workflow”.
- Button copy should predict the outcome.
- Empty-state copy should guide the next step.
- Error copy should explain what happened and how to fix it.
- Success copy should confirm what changed.
- Labels should be short, concrete, and consistent.
- Do not use internal technical jargon unless the target users expect it.

## Data, dashboards, and metrics

- Show the most important metric or task first.
- Use direct labels near data instead of legends where possible.
- Use consistent number formatting.
- Use tabular numerals.
- Use color carefully for status and trends; pair with text or icons.
- Avoid 3D charts, decorative charts, and overly colorful dashboards.
- Animate chart entry subtly, but do not make users wait for data.
- Provide empty, loading, and error states for every chart and table.
- Include timestamps such as “Last updated 2 minutes ago” when data freshness matters.

## Acceptance checklist

Before considering the UI complete, verify:

- There is one obvious primary action per view.
- Layout spacing follows a consistent scale.
- Typography uses a restrained hierarchy and readable sizes.
- Colors are tokenized and work in light and dark mode.
- Every interactive element has hover, active, focus, disabled, and loading behavior as applicable.
- Static elements do not have misleading hover states.
- Forms have labels, useful defaults, inline validation, and clear errors.
- Modals trap focus, restore focus, support Escape, and have clear action labels.
- Loading, empty, error, success, and offline/network states are designed.
- The interface works at mobile width.
- The interface works with keyboard only.
- Touch targets are comfortable.
- Contrast meets accessibility requirements.
- Motion is subtle, purposeful, and respects reduced motion.
- There are no generic AI-design giveaways.
- The app feels fast, stable, and calm.

## Anti-patterns to avoid

- Multiple competing primary buttons on one screen.
- Buttons with vague labels.
- Placeholder text used as the only label.
- Toasts as the only feedback for important actions.
- Hover effects on non-clickable elements.
- Large scale transforms on hover.
- Layout shift during hover, loading, or scroll reveal.
- Hardcoded colors spread through components.
- Inconsistent border radius and spacing.
- Heavy shadows on every card.
- Gradient CTAs.
- Purple/blue AI-style gradients and glowing blobs.
- Repetitive icon-in-circle feature cards.
- Center-aligning all app content.
- Dense forms with no grouping or progressive disclosure.
- Modals for low-importance information.
- Disabled controls with no explanation.
- Raw technical errors shown to users.
- Tiny mobile tap targets.
- Accessibility added after visual design instead of built in from the start.
