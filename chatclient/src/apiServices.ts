export const Login = async (req: { email: string, password: string }) => {
    let { email, password } = req
    // Replace 'your-api-endpoint' with the actual API endpoint for login
    let apiUrl = process.env.REACT_APP_API_URL ?? "";
    apiUrl = apiUrl + "/user/login";
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await response.json();
        if (data?.data) {
            localStorage.setItem("userId", data?.data?.userId);
            localStorage.setItem("token", data?.data?.token);
            localStorage.setItem("email", data?.data?.email);
            console.log("Login successful:", data);
            return true;
        } else {
            console.log("Login Failed", data?.message);
            return false;
        }

        // You can redirect to another page or perform other actions upon successful login
    } catch (error: any) {
        console.error("Login failed:", error.message);
        return false;
        // Handle login failure, e.g., show an error message
    }
};

export const SendMessageApi = async (req: { to: string, message: string }) => {

    // Replace 'your-api-endpoint' with the actual API endpoint for login
    let apiUrl = process.env.REACT_APP_API_URL ?? "";
    apiUrl = apiUrl + "/chat/sendMessage";
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token") ?? ""
            },
            body: JSON.stringify(req),
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await response.json();
        if (data?.data) {

            console.log("Login successful:", data);
            return true;
        } else {
            console.log("Login Failed", data?.message);
            return false;
        }

        // You can redirect to another page or perform other actions upon successful login
    } catch (error: any) {
        console.error("Login failed:", error.message);
        return false;
        // Handle login failure, e.g., show an error message
    }
};

export const GetMyMessages = async () => {
    // Replace 'your-api-endpoint' with the actual API endpoint for login
    let apiUrl = process.env.REACT_APP_API_URL ?? "";
    apiUrl = apiUrl + "/chat/getMyMessages";
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token") ?? ""
            },
            // credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await response.json();
        if (data?.data) {

            console.log("Messages Fetched successfully:", data);
            return data?.data;
        } else {
            console.log("Fetch Failed", data?.message);
            return false;
        }

        // You can redirect to another page or perform other actions upon successful login
    } catch (error: any) {
        console.error("Fetch failed:", error.message);
        return false;
        // Handle login failure, e.g., show an error message
    }
};

export const getSingleMessageThread = async (req: { anotherPerson: string }) => {
    let { anotherPerson } = req
    // Replace 'your-api-endpoint' with the actual API endpoint for login
    let apiUrl = process.env.REACT_APP_API_URL ?? "";
    apiUrl = apiUrl + `/chat/getSingleMessageThread/?anotherPerson=${anotherPerson}`;
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });
        const data = await response.json();
        if (data?.data) {

            console.log("Messages Fetched successfully:", data);
            return data;
        } else {
            console.log("Fetch Failed", data?.message);
            return false;
        }

        // You can redirect to another page or perform other actions upon successful login
    } catch (error: any) {
        console.error("Fetch failed:", error.message);
        return false;
        // Handle login failure, e.g., show an error message
    }
};