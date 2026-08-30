# Instagram Likes Bulk Unliker

A browser-console JavaScript utility for bulk removing liked posts from Instagram's **Your Activity → Interactions → Likes** page.

The script automatically enters Select mode, selects currently loaded liked posts, opens Instagram's Unlike confirmation dialog, confirms the action, waits for the interface to update, and continues with the next batch.

> **Note:** This script depends on Instagram's current web interface and DOM structure. Instagram can change its UI at any time, which may cause the script to stop working.

## Features

* Automatically enters Select mode
* Detects Instagram's currently loaded selectable posts
* Selects loaded posts automatically
* Processes posts in batches
* Automatically opens the Unlike confirmation
* Automatically confirms the Unlike action
* Waits between batches to allow Instagram's interface to update
* Continues without manually reloading the page

## Requirements

* A desktop browser
* A logged-in Instagram account
* Access to Instagram's **Your Activity → Interactions → Likes** page
* Browser Developer Tools / JavaScript Console

## Usage

### 1. Open Instagram

Go to Instagram and navigate to:

**Your Activity → Interactions → Likes**

### 2. Open the Developer Console

In Chrome:

```text
Ctrl + Shift + J
```
or
```text
Ctrl + Shift + I
```

You can also open:

**Developer Tools → Console**

### 3. Paste the script

Open `instagram-unliker.js`, copy the entire script, and paste it into the browser console.

Run it.

The script will automatically attempt to enter Select mode and begin processing the currently loaded liked posts.

### 4. Let it run

The console will display progress similar to:

```text
🚀 Instagram Unlike Bot started

========== BATCH 1 ==========

🔎 Checking Select mode...
🔥 Entering Select mode...
✅ Select mode active — 27 checkboxes

☑️ Selecting 27 posts quickly...
✅ Selected 27 posts

🔥 Opening Unlike confirmation...
✅ Confirmation found
🔥 Unlike confirmed

⏳ Waiting 10s...
✅ Batch 1 completed

🔄 Preparing next batch...
```

## Configuration

The script contains a configuration section near the beginning:

```javascript
const BATCH_SIZE = Infinity;
const CHECKBOX_DELAY = 60;

const SELECT_WAIT = 600;
const AFTER_SELECTION = 1500;
const AFTER_CONFIRM = 10000;
const BETWEEN_BATCHES = 5000;
```

### BATCH_SIZE

`Infinity` means the script attempts to process all currently loaded selectable posts rather than using a fixed number such as 20.

### CHECKBOX_DELAY

Controls the delay between selecting individual posts.

### AFTER_SELECTION

Controls how long the script waits after selecting posts before looking for the Unlike button.

### AFTER_CONFIRM

Controls how long the script waits after confirming an Unlike action before continuing.

### BETWEEN_BATCHES

Controls the pause before beginning the next batch.

## Important

This script interacts with Instagram through the browser's existing interface. It does not use Instagram's API.

Instagram's interface and internal DOM structure can change without notice. Selectors such as:

```javascript
[aria-label="Toggle checkbox"]
```

and:

```javascript
[role="button"][aria-label="Unlike"]
```

may stop working if Instagram changes its interface.

Use the script responsibly and at your own discretion.

## Disclaimer

This is an unofficial, community-created browser-console utility and is not affiliated with, endorsed by, or sponsored by Instagram or Meta.

The author is not responsible for account restrictions, rate limits, lost data, or other consequences resulting from use of the script.

## License

No license has currently been specified for this project.
