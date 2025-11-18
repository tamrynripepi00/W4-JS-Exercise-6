// TODO: Create a Promise that simulates fetching user data
// - The Promise should resolve after 1.5 seconds
// - If userId is positive, resolve with user data object
// - If userId is negative or zero, reject with an error
// - User data should include: id, name, email, and registrationDate

function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        // schedules a function to run once after a specified delay
        // settime show my students after 1.5 seconds - it causes a delay (almost like session time out)
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "Tamryn",
                    email: "tamrynripepi00@gmail.com",
                    registrationDate: "2025-02-01"
                });
            } else {
                reject("Error: userId must be a positive number");
            }
            // the function delays after 1.5s
        }, 1500); // 1.5 seconds
    });
}

fetchUser(1)
    .then(data => console.log("User data loaded:", data))
    .catch(error => console.log("Error:", error));

// TODO: Create a Promise that simulates fetching user posts
// - Should resolve after 1 second
// - Return an array of post objects
// - Each post should have: id, title, content, and userId
// - If userId doesn't exist, reject with error

function fetchUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                const posts = [
                    {id: 1, title: "My post", content: "Hello world!", userId: userId},
                    { id: 2, title: "Learning JS", content: "Promises", userId: userId },
                    { id: 2, title: "Another learning", content: "Async and Awaiting", userId: userId },
                ];
                resolve(posts);
            } else {
                reject("Error: Cannot fetch posts");
            }
        }, 1000); // 1 second delay
    });
}

fetchUserPosts(1)
    .then(posts => console.log("User posts loaded:", posts))
    .catch(error => console.log("Oops! Error occurred:", error));
    
// TODO: Create a function that chains multiple Promises together
// - First fetch user data
// - Then fetch their posts
// - Combine the data into a single object
// - Handle any errors that occur in the chain

async function fetchUserDataAndPosts(userId) {
    // Wait for the info to be loaded
    const user = await fetchUser(userId); // fetchUser returns a Promise with user details
    // Wait for the posts that belong to this user
    const posts = await fetchUserPosts(userId);
    // Combine the user info and posts into one object and return it
    return ({ ...user, posts });
}

// Run the function 
fetchUserDataAndPosts(1)
    .then(result => {
        console.log(JSON.stringify(result, null, 2));
    })
    .catch(console.error);

// TODO: Convert the above Promise chain to use async/await
// - Use try/catch for error handling
// - Log each step of the process
// - Return combined user and posts data

async function loadUserAndPostsAsync(userId) {
    try {
        console.log("Fetching user data...");
        const user = await fetchUser(userId);
        console.log("User data loaded:", user);

        console.log("Fetching user posts...");
        const posts = await fetchUserPosts(user.id);
        console.log("Posts loaded:", posts);

        const combinedData = { ...user, posts };
        return combinedData;

    } catch (error) {
        console.error("Error loading user and posts:", error.message);
        return null; 
    }
}

// TODO: Create a function that fetches multiple users in parallel
// - Take an array of userIds
// - Fetch all users simultaneously using Promise.all
// - Handle errors for individual user fetches
// - Return array of successfully fetched users

async function fetchMultipleUsers(userIds) {
    const userPromises = userIds.map(async id => {
        try {
            return await fetchUser(id);
        } catch (error) {
            console.error(`Failed to fetch user ${id}:`, error.message);
            return null; 
        }
    });
    
    const users = await Promise.all(userPromises);
    return users.filter(user => user !== null);
}

// if i added 'null' in the parameters, my error would call
fetchMultipleUsers([1, 2, 3, 4, 5])
    .then(users => {
        console.log("Successfully fetched users:", users);
    });

// TODO: Create a function that fetches users and their posts in parallel
// - Fetch user data for multiple users
// - Once user data is received, fetch all their posts in parallel
// - Combine user and posts data
// - Handle errors appropriately


function fetchUsersWithPostsParallel(userIds) {
    // Run all user requests at the same time
    return Promise.all(
        userIds.map(async (id) => {
            try {
                // Fetch user info
                const user = await fetchUser(id);
                // Fetch user's posts
                const posts = await fetchUserPosts(id);
                // Return both together
                return { ...user, posts };
            } catch (error) {
                // If this user's fetch fails, return the error
                return { id, error: error.message };
            }
        })
    );
}

fetchUsersWithPostsParallel([1, 2, 3])
    .then(results => console.log(results))
    .catch(console.error);

// TODO: Test success cases
// - Test single user fetch
// - Test multiple user fetch
// - Test error handling

fetchUsersWithPostsParallel([1])
    .then(result => {
        console.log("Single user success:", result);
    })
    .catch(err => {
        console.error("Single user failed:", err);
    });
