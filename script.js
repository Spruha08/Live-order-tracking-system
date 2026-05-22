const API_URL =
    "http://127.0.0.1:8000/orders";

const ordersContainer =
    document.getElementById("ordersContainer");

const adminOrdersContainer =
    document.getElementById("adminOrdersContainer");

const notification =
    document.getElementById("notification");


// WEBSOCKET

const socket =
    new WebSocket("ws://127.0.0.1:8000/ws");


socket.onmessage = (event) => {

    showNotification(event.data);

    if (typeof fetchOrders === "function") {

        fetchOrders();
    }

    if (typeof filterOrders === "function") {

        filterOrders();
    }
};


// NOTIFICATION

function showNotification(message) {

    if (!notification) return;

    notification.innerText = message;

    notification.style.display = "block";

    setTimeout(() => {

        notification.style.display = "none";

    }, 3000);
}


// FETCH ORDERS FOR RESTAURANT

async function fetchOrders() {

    if (!adminOrdersContainer) return;

    const response =
        await fetch(API_URL);

    const orders =
        await response.json();

    adminOrdersContainer.innerHTML = "";


    orders.forEach(order => {

        let statusClass = "";

        if (order.status === "Preparing") {

            statusClass = "preparing";
        }

        else if (order.status === "On the Way") {

            statusClass = "on-the-way";
        }

        else {

            statusClass = "delivered";
        }


        adminOrdersContainer.innerHTML += `

        <div class="order-card">

            <h2>🍔 ${order.product_name}</h2>

            <p>
                <strong>Customer:</strong>
                ${order.customer_name}
            </p>

            <p>
                <strong>Order ID:</strong>
                ${order.id}
            </p>

            <span class="status ${statusClass}">
                ${order.status}
            </span>

            <select id="status-${order.id}">

                <option value="Preparing">
                    Preparing
                </option>

                <option value="On the Way">
                    On the Way
                </option>

                <option value="Delivered">
                    Delivered
                </option>

            </select>

            <button onclick="updateOrder(${order.id})">
                Update Order Status
            </button>

        </div>
        `;
    });
}


// CREATE ORDER

async function createOrder() {

    const customerName =
        document.getElementById("customerName").value;

    const productName =
        document.getElementById("productName").value;

    const status =
        document.getElementById("status").value;


    const orderData = {

        customer_name: customerName,

        product_name: productName,

        status: status
    };


    await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(orderData)
    });


    showNotification(
        "Order Created Successfully ✅"
    );

    fetchOrders();
}


// UPDATE ORDER

async function updateOrder(orderId) {

    const newStatus =
        document.getElementById(`status-${orderId}`).value;

    await fetch(

        `http://127.0.0.1:8000/orders/${orderId}?status=${newStatus}`,

        {
            method: "PUT"
        }
    );
}


// CUSTOMER FILTER

async function filterOrders() {

    if (!ordersContainer) return;

    const customerName =
        document.getElementById("searchCustomer").value;

    const response =
        await fetch(API_URL);

    const orders =
        await response.json();

    ordersContainer.innerHTML = "";


    const filteredOrders = orders.filter(order =>

        order.customer_name
             .toLowerCase()
             .includes(customerName.toLowerCase())
    );


    filteredOrders.forEach(order => {

        let statusClass = "";

        if (order.status === "Preparing") {

            statusClass = "preparing";
        }

        else if (order.status === "On the Way") {

            statusClass = "on-the-way";
        }

        else {

            statusClass = "delivered";
        }


        ordersContainer.innerHTML += `

        <div class="order-card">

            <h2>🍔 ${order.product_name}</h2>

            <p>
                <strong>Customer:</strong>
                ${order.customer_name}
            </p>

            <p>
                <strong>Order ID:</strong>
                ${order.id}
            </p>

            <span class="status ${statusClass}">
                ${order.status}
            </span>

        </div>
        `;
    });
}


// AUTO LOAD RESTAURANT PAGE

fetchOrders();