let todos = [];
const addInput = document.querySelector("#addInput");
const addForm = document.querySelector("#addForm");
const todoList = document.querySelector("#todoList");
/*-----------------------------------------------------*/
addForm.addEventListener("submit", (e) => {
    e.preventDefault(); // ngăn chuyển trang
    if (addInput.value) {
        addTodo(addInput.value);//nếu có giá trị, thêm addTodo, sau đó
        addInput.value = ""; // làm rỗng trường nhập dữ liệu
    }
});
/*-----------------------------------------------------*/
function addTodo(addedValue) {
    const newTodo = {
        id: Date.now(), //tạo id duy nhất
        label: addedValue, // dữ liệu nhập
        isDone: false,
    };
    todos.unshift(newTodo);// thêm newTodo vào todos
    renderTodos();//cập nhật giao diện
}
/*-----------------------------------------------------*/
function renderTodos() {
    todoList.innerHTML = "";// xóa dữ liệu hiện tại của phần tử

    todos.forEach((todo) => {
        const { id, label, isDone, isEditting } = todo || {}; // lấy thuộc tính trong todo

        //tạo danh sách todo list
        const todoItem = document.createElement("li");//Tạo một phần tử <li> mới để chứa // // todoItem.className = `todo-item ${isDone ? "done" : ""}`;
        if (isDone) {
            todoItem.className = "todo-item done";//đặt class khi isDone==true
        } else {
            todoItem.className = "todo-item"; // ngược lại nếu isDone==false
        }
        todoItem.id = id;// đặt id cho <li> 

        // nội dung todo list
        const labelNode = document.createElement('span'); //Tạo <span> mới để hiển thị nhãn của công việc.
        labelNode.className = "todo-label";//đặt class cho <span>
        labelNode.innerText = label;// đặt nôi dung của labelNode là label của todos

        //tạo div bọc các button
        const actionNode = document.createElement('div')
        actionNode.className = "todo-action"

        //TẠO NÚT DELETE
        const deleteBtn = document.createElement('button'); //tọa <button></button>
        deleteBtn.className = "btn btn-delete"// đặt class cho <button class='btn btn-delete'></button>
        deleteBtn.innerText = "Delete";// đặt nên cho button <button class='btn btn-delete'>Delete</button>
        deleteBtn.addEventListener('click', function (e) {
            e.preventDefault();//sự kiện click, ngăn chuyển trang và thực hiện gọi hàm deleteTodo
            deleteTodo(id); //khai báo bên dưới
        })

        //TẠO NÚT EDIT
        const editBtn = document.createElement('button') // <button></button>
        editBtn.className = 'btn btn-edit'; //<button class="btn btn-edit"></button>
        editBtn.innerText = "Edit";//<button class="btn btn-edit">Edit</button>
        editBtn.addEventListener('click', function (e) {
            e.preventDefault();//
            toggleEditView(id);; //sự kiện click button, thực hiện hàm  toggleEditView
        })

        //TẠO NÚT DONE/UNDONE
        const doneBtn = document.createElement('button'); //tọa <button></button>
        doneBtn.className = "btn btn-done"// <button class='btn btn-done'></button>
        // doneBtn.innerText = isDone ? "Undone" : "Done";
        if (isDone) {
            doneBtn.innerText = 'Undone'; //isDone==true
        }
        else {
            doneBtn.innerText = 'Done';//isDone==false
        }
        doneBtn.addEventListener('click', function (e) {
            e.preventDefault();//sự kiện click để gọi hàm updateTodoStatus
            updateTodoStatus(id); //khai báo bên dưới
        })

        //TẠO FROM EDIT CÔNG VIỆC
        // input
        const editInput = document.createElement('input'); //tạo <input>
        editInput.className = "input editInput"//tạo class
        editInput.value = label; // giá trị của editInput
        //tạo button Save của form edit
        const saveBtn = document.createElement('button');
        saveBtn.className = 'btn';
        saveBtn.innerText = 'Save';
        //tạo form nhập dữ liệu
        const editForm = document.createElement('form');//<form></form>
        editForm.className = 'form editForm';
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (editInput.value) {
                updateTodoLabel(id, editInput.value); // gọi hàm updateTodoLabel, toggleEditView
                toggleEditView(id);
                editInput.value = "";
            }
        })

        //HIỂN THỊ FORM EDIT
        //trong todo, nếu isEditting là true:  
        if (isEditting) {
            editForm.appendChild(editInput);// thêm editInput vào editForm
            editForm.appendChild(saveBtn);//thêm saveBtn vào editForm

            todoItem.appendChild(editForm);//thêm form efit vào todoItem (<li></li>)
        }
        //Nếu isEditting là false:
        else {
            actionNode.appendChild(deleteBtn);// thêm button delete vào ds hiển thị
            // !isDone&&actionNode.appendChild(editBtn);
            if (!isDone) {
                actionNode.appendChild(editBtn);
            }// nếu công việc chưa hoàn thành thì thêm button edit vào ds hiển thị
            actionNode.appendChild(doneBtn);// thêm button Done vào ds hiển hị

            todoItem.appendChild(labelNode);//thêm nội dung công việc 
            todoItem.appendChild(actionNode);// thêm danh sách button vào todoItem
        }
        todoList.appendChild(todoItem); // thêm todoItem vào danh sách todoList
    });
}
/*-----------------------------------------------------*/
//XÓA ITEM
function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);// lọc todos,loại công việc có id khớp với id cung cấp
    renderTodos();// để cập nhật lại giao diện 
}
//UPDATE
function updateTodoStatus(id) {
    todos = todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    ); // Duyệt qua danh sách todos và cập nhật trạng thái isDone của công việc có id khớp với id được cung cấp.
    renderTodos();
}
//
function toggleEditView(id) {
    todos = todos.map((todo) =>
        todo.id === id ? { ...todo, isEditting: !todo.isEditting } : todo
    ); // duyệt qua todos và chuyển đổ giá trị !todo.isEditting 
    renderTodos();
}
//

function updateTodoLabel(id, editedLabel) {
    todos = todos.map((todo) =>
        todo.id === id ? { ...todo, label: editedLabel } : todo
    );//Duyệt  todos và cập nhật lại công việc có id khớp với id được cung cấp.
    renderTodos();
}
/*-----------------------------------------------------*/

