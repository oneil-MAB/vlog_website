// Get the saved posts
function getPosts() {
    return JSON.parse(localStorage.getItem("posts")) || [];
}

// Save posts
function savePosts(posts) {
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Display posts
function displayPosts() {
    const posts = getPosts();
    const postsContainer = document.getElementById("posts");

    if (!postsContainer) return;

    postsContainer.innerHTML = "";

    posts.forEach(function(post, index) {

        const postDiv = document.createElement("div");

        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>By: ${post.name}</p>
            <p>${post.text}</p>

            <h4>Comments</h4>
            <div id="comments-${index}"></div>

            <input type="text"
                id="comment-${index}"
                placeholder="Write a comment">

            <button onclick="addComment(${index})">
                Comment
            </button>

            <hr>
        `;

        postsContainer.appendChild(postDiv);

        const commentsDiv = document.getElementById(
            "comments-" + index
        );

        post.comments.forEach(function(comment) {
            const p = document.createElement("p");
            p.textContent = comment;
            commentsDiv.appendChild(p);
        });
    });
}

// Create a new post
const postForm = document.getElementById("postForm");

if (postForm) {
    postForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("postName").value;
        const title = document.getElementById("postTitle").value;
        const text = document.getElementById("postText").value;

        const posts = getPosts();

        posts.push({
            name: name,
            title: title,
            text: text,
            comments: []
        });

        savePosts(posts);

        postForm.reset();

        displayPosts();

        alert("Your post was published!");
    });

    displayPosts();
}

// Add a comment
function addComment(index) {

    const commentInput = document.getElementById(
        "comment-" + index
    );

    const comment = commentInput.value.trim();

    if (comment === "") {
        alert("Please write a comment!");
        return;
    }

    const posts = getPosts();

    posts[index].comments.push(comment);

    savePosts(posts);

    displayPosts();
}

// Get a random quote from public API

async function getQuote() {

    try {

        const response = await fetch(
            "https://dummyjson.com/quotes/random"
        );

        const data = await response.json();

        console.log("Quote:", data.quote);
        console.log("Author:", data.author);

    } catch (error) {

        console.log("Unable to load quote.");

    }
}

// PUBLIC API - RANDOM QUOTES

async function getQuote() {

    const quote = document.getElementById("quote");
    const author = document.getElementById("author");

    if (!quote || !author) {
        console.log("Quote elements not found.");
        return;
    }

    quote.textContent = "Loading quote...";
    author.textContent = "";

    try {

        const response = await fetch(
            "https://dummyjson.com/quotes/random"
        );

        if (!response.ok) {
            throw new Error("API Error: " + response.status);
        }

        const data = await response.json();

        quote.textContent = '"' + data.quote + '"';
        author.textContent = "- " + data.author;

    } catch (error) {

        quote.textContent = "Sorry! Unable to load quote.";
        author.textContent = error.message;

        console.log(error);
    }
}

// Load quote when page opens
getQuote();