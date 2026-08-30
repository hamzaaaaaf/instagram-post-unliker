# Instagram Likes Bulk Unliker

A simple browser-console tool that helps you **bulk unlike posts you've previously liked on Instagram**.

Instead of manually selecting and unliking posts one by one, the tool automates the process for you.

> ⚠️ **Important:** This is an unofficial community-made tool. It is not affiliated with Instagram or Meta. Instagram can change its website at any time, which may cause the tool to stop working.

## ✨ Features

* Automatically enters Instagram's **Select** mode
* Automatically detects available liked posts
* Selects posts quickly
* Unlikes multiple posts automatically
* Automatically handles Instagram's confirmation dialog
* Waits between batches so Instagram has time to update
* Continues processing without requiring you to manually reload the page
* Works directly in your browser — no installation required

## 🖥️ Requirements

You will need:

* A desktop computer
* Google Chrome or another Chromium-based browser
* An Instagram account
* Access to your Instagram **Likes** activity
* A few minutes to set up the script

## 🚀 How to Use

### 1. Open Instagram

Log into Instagram and go to:

**Your Activity → Interactions → Likes**

You should see the list of posts you've liked.

### 2. Open the Browser Console

In Google Chrome, press:

**Ctrl + Shift + J**

Alternatively:

**Ctrl + Shift + I → Console**

### 3. Run the Script

Open the JavaScript file included in this repository.

Copy the entire script and paste it into the browser console.

Press **Enter** to start it.

The tool will automatically:

1. Enter Select mode
2. Find the currently loaded posts
3. Select them
4. Click Unlike
5. Confirm the action
6. Wait for Instagram to update
7. Continue with the next batch

### 4. Let It Run

You can monitor its progress through the browser console.

You'll see messages showing things like:

* Which batch is currently being processed
* How many posts were selected
* When an Unlike action is being performed
* When Instagram is being given time to update
* When the next batch begins

You **do not need to manually reload the page** between batches.

## ⚙️ How It Works

The tool processes the posts that Instagram has currently loaded on the page.

After completing a batch, it waits for Instagram to update and load the next available posts before continuing.

The current version is configured to:

* Select as many currently available posts as possible
* Select posts with a short delay between each selection
* Wait a few seconds after selecting posts
* Give Instagram up to several seconds to respond when necessary
* Wait **8 seconds** after an Unlike action
* Wait an additional **5 seconds** before starting the next batch

These delays are intentional and help prevent the script from moving faster than Instagram's interface can handle.

## ⚠️ Important Notes

### Keep Instagram Open

For the most reliable results, keep the Instagram tab open and visible while the script is running.

Switching to another application may work, but browser performance can vary depending on your computer, Chrome settings, and whether the page becomes inactive.

### Instagram May Load Posts Slowly

Instagram does not necessarily load every liked post at once.

If additional posts take time to appear, the script waits for them before continuing.

### Don't Interact With the Page While It's Running

Avoid manually clicking buttons, selecting posts, scrolling, or navigating away from the Likes page while the tool is running.

Doing so can interfere with the automation.

### The Script May Stop

If Instagram changes its interface or something unexpected happens, the script may stop rather than continue blindly.

If that happens, check the console for the message explaining what happened.

## 🔒 Privacy

The script runs directly inside your browser.

It does **not** require you to provide:

* Your Instagram password
* Your Instagram session cookie
* Your account credentials
* An API key

Never give your Instagram password or session information to anyone claiming they need it for this tool.

## ⚠️ Disclaimer

This project is an unofficial community-created browser utility and is **not affiliated with, endorsed by, or sponsored by Instagram or Meta**.

Use it at your own discretion.

Instagram may impose limits or restrictions on automated activity, and the behavior of this tool may change if Instagram changes its website.

The author is not responsible for account restrictions, rate limits, unexpected behavior, or any other consequences resulting from use of the tool.

## 📄 License

No license has currently been specified for this project.
