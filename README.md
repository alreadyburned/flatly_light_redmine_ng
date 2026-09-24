# Flatly light redmine theme (Redmine 7.0.1 compatibility fork)

> ⚠️ **This repository is a local fork of the original [flatly_light_redmine](https://github.com/Nitrino/flatly_light_redmine), with a small set of modifications.**
> Rather than rewriting the theme, only the changes needed to address **compatibility issues with Redmine 7.0.1** were made, with the help of AI (Claude). The original README is preserved unchanged below this notice.

## Changes in this fork

- **Modified by**: Reviewed and modified with the help of AI (Claude)
- **Purpose**: Compatibility fixes for Redmine 7.0.1
- **Scope**: See the Fork Changelog below. The theme's design concept, colors, fonts, and images remain unchanged from the original.

### Fork Changelog

- 2026-09-24
  - `stylesheets/application.css`: Changed the core stylesheet import from `../../../stylesheets/application.css` to `/application.css`, where Redmine 7 (Propshaft) serves it. Changed the protocol-relative Google Fonts (Lato) import to `https://`.
  - `stylesheets/application.css`: Added a "Redmine 7 compatibility" section:
    - Restyled the left side panel for the new top-menu markup (`nav#top-menu > .general-menu / .profile-menu`, `.top-menu__links`), and made the `#account` dropdown open upwards because it now sits at the bottom of the panel.
    - Made the header/main menu backgrounds transparent, let the quick-search form flex, and kept the collapsible sidebar working despite the theme's `#sidebar { width: 15% !important }`.
    - Redmine 7 renders icons as inline SVG. Where an SVG icon is present, hid the theme's FontAwesome pseudo-element icons to avoid double icons, and recolored the SVG icons to match the theme.
  - `javascripts/theme.js`:
    - The logo was prepended to `#loggedas`, which no longer exists. It now goes at the top of `#top-menu`, and only once.
    - Replaced `$(window).load()`, which was removed in jQuery 3, with `$(window).on('load', ...)`. Updated the stale selectors `#s2id_project_quick_jump_box` → `#project-jump` and `#wrapper3` → `#wrapper` for the static sidebar option.
    - Fixed the rule removal that disables Redmine's responsive layout: `deleteRule()` takes an index, not a rule. Also skipped cross-origin stylesheets, whose `cssRules` throw when read.

---

# Flatly light redmine theme #
Modern and readability theme for Redmine.

## Installation

* Download and unzip theme into your Redmine themes directory (e.g. ` ../public/themes/`)
* Restart Redmine to make the newly installed theme available in your theme list.
* Go to `"Administration / Settings / Display"` and choose this theme in themes list.
* Save your changes.

## Screenshots
![](https://raw.githubusercontent.com/Nitrino/flatly_light_redmine/master/screenshots/screen_1.png)

![](https://raw.githubusercontent.com/Nitrino/flatly_light_redmine/master/screenshots/screen_2.png)

![](https://raw.githubusercontent.com/Nitrino/flatly_light_redmine/master/screenshots/screen_3.png)

## Enable static sidebar
To activate the static sidebar set `var activeStaticSidebar = true` in `javascripts/theme.js` file

![](https://raw.githubusercontent.com/Nitrino/flatly_light_redmine/master/screenshots/screen_4.png)

## Contributing
1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
