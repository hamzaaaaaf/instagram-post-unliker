(async () => {
    "use strict";

    // =====================================================
    // CONFIG
    // =====================================================

    const BATCH_SIZE = Infinity;

    // Fast checkbox selection
    const CHECKBOX_DELAY = 60;

    // UI waits
    const SELECT_WAIT = 600;
    const AFTER_SELECTION = 1500;
    const AFTER_CONFIRM = 8000;
    const BETWEEN_BATCHES = 5000;

    const sleep = ms =>
        new Promise(resolve => setTimeout(resolve, ms));


    console.log("🚀 Instagram Unlike Bot started");


    // =====================================================
    // REAL CLICK
    // =====================================================

    const realClick = async (el) => {

        if (!el) return false;

        el.scrollIntoView({
            block: "center",
            behavior: "instant"
        });

        await sleep(300);

        const rect = el.getBoundingClientRect();

        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;


        [
            "pointerdown",
            "mousedown",
            "pointerup",
            "mouseup",
            "click"
        ].forEach(type => {

            el.dispatchEvent(
                new MouseEvent(type, {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: x,
                    clientY: y
                })
            );

        });


        await sleep(500);

        return true;
    };


    // =====================================================
    // FIND TEXT BUTTON
    // =====================================================

    const findTextButton = (texts) => {

        const elements = [
            ...document.querySelectorAll(
                '[role="button"],button,span'
            )
        ];

        return elements.find(el => {

            const rect =
                el.getBoundingClientRect();

            if (
                rect.width <= 0 ||
                rect.height <= 0
            )
                return false;

            const text = (
                el.innerText ||
                el.textContent ||
                ""
            )
            .trim()
            .toLowerCase();

            return texts.some(
                t => text === t.toLowerCase()
            );
        });
    };


    // =====================================================
    // ENTER SELECT MODE
    // =====================================================

    const enterSelectMode = async () => {

        console.log(
            "🔎 Checking Select mode..."
        );


        // Already in select mode?
        if (
            getCheckboxes().length > 0
        ) {

            console.log(
                "✅ Already in Select mode"
            );

            return true;
        }


        let select = null;


        for (let attempt = 1; attempt <= 300; attempt++) {

            select = findTextButton([
                "Select",
                "Seleziona"
            ]);


            if (select)
                break;


            console.log(
                `⏳ Select not found (attempt ${attempt}/300)`
            );

            await sleep(500);
        }


        if (!select) {

            console.log(
                "❌ Select button not found."
            );

            return false;
        }


        console.log(
            "🔥 Entering Select mode..."
        );


        await realClick(select);


        await sleep(
            SELECT_WAIT
        );


        const boxes =
            getCheckboxes();


        if (!boxes.length) {

            console.log(
                "❌ Select mode did not activate."
            );

            return false;
        }


        console.log(
            `✅ Select mode active — ${boxes.length} checkboxes`
        );


        return true;
    };


    // =====================================================
    // GET CHECKBOXES
    // =====================================================

    function getCheckboxes() {

        return [
            ...document.querySelectorAll(
                '[aria-label="Toggle checkbox"]'
            )
        ].filter(el => {

            const rect =
                el.getBoundingClientRect();

            return (
                rect.width > 0 &&
                rect.height > 0
            );
        });
    }


    // =====================================================
    // FIND MAIN UNLIKE
    // =====================================================

    const findUnlikeButton = () => {

        const spans = [
            ...document.querySelectorAll("span")
        ];


        const targetSpan = spans.find(s => {

            const text =
                (s.textContent || "").trim();


            if (
                text !== "Unlike" &&
                text !== "Non mi piace più"
            )
                return false;


            const rect =
                s.getBoundingClientRect();


            return (
                rect.width > 0 &&
                rect.height > 0
            );
        });


        if (!targetSpan)
            return null;


        let el = targetSpan;


        while (el) {

            if (
                el.getAttribute &&
                el.getAttribute("role") === "button"
            ) {

                const rect =
                    el.getBoundingClientRect();


                if (
                    rect.width > 0 &&
                    rect.height > 0
                ) {

                    return el;
                }
            }


            el = el.parentElement;
        }


        return null;
    };


    // =====================================================
    // FIND CONFIRMATION
    // =====================================================

    const findConfirmUnlikeButton = () => {

        const buttons = [
            ...document.querySelectorAll(
                'button,[role="button"]'
            )
        ];


        const candidates = buttons.filter(btn => {

            const rect =
                btn.getBoundingClientRect();


            const text = (
                btn.innerText ||
                btn.textContent ||
                ""
            ).trim();


            return (
                rect.width > 0 &&
                rect.height > 0 &&
                text === "Unlike" &&
                getComputedStyle(btn).pointerEvents !== "none"
            );
        });


        if (!candidates.length)
            return null;


        return candidates[
            candidates.length - 1
        ];
    };


    // =====================================================
    // SELECT POSTS FAST
    // =====================================================

    const selectBatch = async () => {

        let boxes =
            getCheckboxes();


        if (!boxes.length)
            return 0;


        const amount =
            Math.min(
                BATCH_SIZE,
                boxes.length
            );


        console.log(
            `☑️ Selecting ${amount} posts quickly...`
        );


        for (let i = 0; i < amount; i++) {

            boxes =
                getCheckboxes();


            const box =
                boxes[i];


            if (!box)
                continue;


            // This is the fast method from
            // the script you found.

            box.click();


            await sleep(
                CHECKBOX_DELAY
            );
        }


        return amount;
    };


    // =====================================================
    // MAIN LOOP
    // =====================================================

    let batch = 0;


    while (true) {

        batch++;


        console.log(
            `\n========== BATCH ${batch} ==========`
        );


        // -----------------------------------------------
        // ENTER SELECT MODE AUTOMATICALLY
        // -----------------------------------------------

        const selectReady =
            await enterSelectMode();


        if (!selectReady) {

            console.log(
                "🛑 Could not enter Select mode."
            );

            break;
        }


        // -----------------------------------------------
        // SELECT POSTS
        // -----------------------------------------------

        const selected =
            await selectBatch();


        if (!selected) {

            console.log(
                "🏁 No posts available to select."
            );

            break;
        }


        console.log(
            `✅ Selected ${selected} posts`
        );


        await sleep(
            AFTER_SELECTION
        );


        // -----------------------------------------------
        // FIND UNLIKE
        // -----------------------------------------------

        let unlikeButton = null;


        for (
            let attempt = 1;
            attempt <= 40;
            attempt++
        ) {

            unlikeButton =
                findUnlikeButton();


            if (unlikeButton)
                break;


            console.log(
                `⏳ Waiting for Unlike... ${attempt}/10`
            );


            await sleep(500);
        }


        if (!unlikeButton) {

            console.log(
                "❌ Unlike button not found."
            );


            console.log(
                "🛑 STOPPING to prevent accidental unselection."
            );


            break;
        }


        console.log(
            "🔥 Opening Unlike confirmation..."
        );


        // -----------------------------------------------
        // FIRST CLICK
        //
        // REAL CLICK
        // -----------------------------------------------

        await realClick(
            unlikeButton
        );


        await sleep(1000);


        // -----------------------------------------------
        // CONFIRMATION
        // -----------------------------------------------

        let confirmButton = null;


        for (
            let attempt = 1;
            attempt <= 15;
            attempt++
        ) {

            confirmButton =
                findConfirmUnlikeButton();


            if (confirmButton)
                break;


            await sleep(400);
        }


        if (!confirmButton) {

            console.log(
                "❌ Confirmation button not found."
            );


            console.log(
                "🛑 STOPPED."
            );


            break;
        }


        console.log(
            "✅ Confirmation found"
        );


        // -----------------------------------------------
        // SECOND CLICK
        //
        // NORMAL .click()
        // -----------------------------------------------

        confirmButton.click();


        console.log(
            "🔥 Unlike confirmed"
        );


        // -----------------------------------------------
        // WAIT FOR INSTAGRAM
        // -----------------------------------------------

        console.log(
            `⏳ Waiting ${AFTER_CONFIRM / 1000}s...`
        );


        await sleep(
            AFTER_CONFIRM
        );


        console.log(
            `✅ Batch ${batch} completed`
        );


        // -----------------------------------------------
        // NO RELOAD
        // -----------------------------------------------

        await sleep(
            BETWEEN_BATCHES
        );


        console.log(
            "🔄 Preparing next batch..."
        );
    }


    console.log(
        "\n🏁 Instagram Unlike Bot stopped."
    );

})();
