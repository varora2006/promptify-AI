document.addEventListener("DOMContentLoaded", function () {

    console.log("🔥 PROMPTIFY JS IS WORKING!");

    const input = document.getElementById("topicInput");
    const button = document.getElementById("generateBtn");

    const empty = document.getElementById("previewEmpty");
    const loading = document.getElementById("loadingState");
    const results = document.getElementById("resultsContainer");

    const promptBox = document.getElementById("promptResult");
    const descriptionBox = document.getElementById("descriptionResult");

    const counter = document.getElementById("characterCount");

    let purpose = "College Assignment";


    // ==========================
    // CHARACTER COUNTER
    // ==========================

    input.addEventListener("input", function () {

        counter.textContent =
            input.value.length + " / 500";

    });


    // ==========================
    // PURPOSE
    // ==========================

    document.querySelectorAll(".purpose-btn").forEach(function (btn) {

        btn.addEventListener("click", function () {

            document.querySelectorAll(".purpose-btn").forEach(function (b) {
                b.classList.remove("active");
            });

            btn.classList.add("active");

            purpose =
                btn.getAttribute("data-purpose");

            console.log("Purpose:", purpose);

        });

    });


    // ==========================
    // GENERATE
    // ==========================

    button.addEventListener("click", function () {

        console.log("🔥 GENERATE BUTTON CLICKED");

        const userText = input.value.trim();


        if (userText === "") {

            alert("Please enter a topic first!");

            input.focus();

            return;

        }


        // Get clean topic

        let topic = userText
            .replace(/^explain\s+/i, "")
            .replace(/^what\s+is\s+/i, "")
            .replace(/^describe\s+/i, "")
            .replace(/^tell\s+me\s+about\s+/i, "");


        topic = topic
            .replace(
                /\s+for\s+my\s+college\s+assignment.*$/i,
                ""
            )
            .trim();


        // ==========================
        // SHOW LOADING
        // ==========================

        empty.style.display = "none";

        results.style.display = "none";

        loading.style.display = "flex";


        // ==========================
        // GENERATE
        // ==========================

        setTimeout(function () {


            const detailedPrompt =

`Create a detailed and student-friendly explanation of "${topic}".

Purpose: ${purpose}

Please cover the following sections:

1. Introduction
2. Definition
3. Key Concepts
4. How It Works
5. Types or Components
6. Real-World Applications
7. Examples
8. Advantages
9. Limitations
10. Future Scope
11. Conclusion

Requirements:

• Use simple and easy-to-understand language.
• Explain the topic clearly from basic to advanced level.
• Include relevant examples.
• Use headings and bullet points.
• Make the content suitable for a student.
• Keep the explanation informative and well structured.`;


            const detailedDescription =

`INTRODUCTION

${topic} is an important topic that can be understood by studying its meaning, working process, applications, advantages and limitations.


DEFINITION

${topic} refers to a concept, process, technology or area of study that has specific principles and practical applications.


KEY CONCEPTS

• Basic meaning and principles
• Important components
• Main characteristics
• Working process
• Practical applications


HOW IT WORKS

The working of ${topic} depends on a series of concepts, processes or methods. Understanding these stages helps students understand how the topic works in practical situations.


APPLICATIONS

• Education and learning
• Business and professional activities
• Technology and digital services
• Research and innovation
• Real-world problem solving


ADVANTAGES

• Helps improve understanding and efficiency
• Has practical applications
• Can support better decision-making
• Can save time and resources when used correctly


LIMITATIONS

• Implementation may require proper knowledge
• Results may depend on available resources
• Different situations may require different approaches
• Practical implementation can sometimes be complex


FUTURE SCOPE

${topic} can continue to develop as technology, research and industry practices evolve. Future developments may make it more useful, efficient and accessible.


CONCLUSION

In conclusion, ${topic} is an important concept with educational and practical value. Understanding its definition, working, applications, advantages and limitations provides a strong foundation for further learning.`;


            // ==========================
            // PUT RESULTS
            // ==========================

            promptBox.textContent =
                detailedPrompt;

            descriptionBox.textContent =
                detailedDescription;


            // ==========================
            // SHOW RESULTS
            // ==========================

            loading.style.display = "none";

            results.style.display = "block";

            results.classList.add("show");


            console.log("✅ RESULTS GENERATED!");

        }, 1200);

    });


    // ==========================
    // COPY BUTTONS
    // ==========================

    document.querySelectorAll(".copy-btn").forEach(function (btn) {

        btn.addEventListener("click", async function () {

            const id =
                btn.getAttribute("data-copy");

            const element =
                document.getElementById(id);

            if (!element) return;

            try {

                await navigator.clipboard.writeText(
                    element.innerText
                );

                const oldText =
                    btn.innerText;

                btn.innerText =
                    "✓ Copied!";

                setTimeout(function () {

                    btn.innerText = oldText;

                }, 1500);

            } catch (error) {

                alert("Copy failed. Please copy manually.");

            }

        });

    });


    // ==========================
    // QUICK EXAMPLES
    // ==========================

    document.querySelectorAll(".quick-example").forEach(function (example) {

        example.addEventListener("click", function () {

            const text =
                example.getAttribute("data-topic");

            input.value = text;

            input.dispatchEvent(
                new Event("input")
            );

            input.focus();

        });

    });


});