# con-register
Simple inventory tracking and receipt making software.

A live demo exists here: http://percipient24.github.io/con-register/#/

This project is designed to run locally on a tablet, and track inventory and sales for items at a convention.

##Quick Setup:

1. Set up your Items and Bundle Deals easily using a copy of this Google Sheet https://docs.google.com/spreadsheets/d/14rE4AOPLa1aYg75jExuS1Am5MtbWRXP70sm1Tm5juHY/edit?usp=sharing (If you're logged in to your Google Account, you can select File > Make a Copy, and go to town). The cells on the output sheet correspond to data/items.json and data/bundles.json respectively - although you'll have to do some finagling to make what you copy there into proper JSON.
2. The fastest way to get up and running is to grab the source from the gh-pages branch. This is already built. Replace the JSON files with the info from step 1, and then visit index.html in a browser (Chrome will break because of Cross-Origin policies, but Firefox and Safari seem to work fine).
3. If you want to tweak the receipt text, that's at the top of views/main.html (sorry, it's minified).

##Caveats:

1. It was designed to work on a 1920x1080 resolution. It should work ok on smaller screens - depending on how many items you have. Definitely not optimized for mobile at all.
2. It was designed with a single view to minimize the number of requests (in case the USB stick it's running on goes unplugged). This way, once the app loads it can continue to run so long as the page isn't refreshed. (I didn't feel like messing with the manifest just yet.) I know that's not the best way to organize the code/views.
3. Yes, the Services are not DRY at all.
