# Agricultural Advisory Portal — Reference-Matched Angular Edition

This is the updated source for the six-page Angular Agricultural Advisory Portal. The layout has been redesigned to follow the user's reference collage: consistent dark-green navigation/footer, green and white cards, agricultural imagery, and six matching pages.

## Run locally

1. Extract this ZIP into a new folder.
2. Open that folder in VS Code.
3. Open a terminal in the folder and run:

   ```powershell
   npm.cmd install
   npm.cmd start
   ```
4. Visit http://localhost:4200/.

## Pages
- Home: hero background, service cards, popular crop cards.
- Register: farmer form with validation and Local Storage.
- Advisory: choose a crop to view advice from the JSON data.
- Crops: crop search, image cards, comparison table.
- Market: price table and crop value calculator.
- Contact: message form and support details.

Crop images and the farmer/field hero image are stored locally under `src/assets/images`, so those images do not require external image hosting. Google Fonts may require internet access; the site falls back to Arial if unavailable.
