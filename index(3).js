let todoList = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [];

onload = function(){
    viewTodoList();
}

// 엔터, + 버튼 누르면 입력한 내용을 배열에 추가 + 로컬스토로지에 저장
function addTodo(ev){
    if (document.getElementById('search-input').value.trim() === '')
        return;

    if (!ev.keyCode || ev.keyCode === 13) {
        const todo = document.getElementById('search-input').value;
        // console.log(todoList)
        
        todoList.push({
            title : todo,
            isDone : false,
            date : new Date()
        })

        localStorage.setItem('todoList', JSON.stringify(todoList))
        // console.log(todo)
        viewTodoList();
        document.getElementById('search-input').value = '';
    }
    
}


// todoList 배열을 그려주는 함수
function viewTodoList(){

    // view 전체 삭제후 다시 그리기a
    let parent = document.getElementById('todo-list-view')
    $(parent).empty();

    // 반복문 돌면서 그려주기
    for(let list of todoList){
        const todoNode = document.createElement('div'); // <div>title</div>
        todoNode.innerText = list.title;
        parent.appendChild(todoNode);

        todoNode.onclick = function(){
            todoNode.isDone = !todoNode.isDone;
            if (todoNode.isDone) {
                this.className = 'done';
                list.isDone = true;
            } else {
                this.className = '';
                list.isDone = false;
            }
            localStorage.setItem('todoList', JSON.stringify(todoList))
        }
        const removeBtn = document.createElement('button'); // <button><i class='fa-solid fa-xmark'></i></button>
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = "<i class='fa-solid fa-xmark'></i>";
        todoNode.appendChild(removeBtn); // <div>밥먹기<button><i class='fa-solid fa-xmark'></i></button></div>
        
        removeBtn.onclick = function(){
            
            // 삭제한 요소 todoList 배열에도 적용하기
            // filter는 true를 반환하는 항목만 새 배열에 포함시킴
            todoList = todoList.filter(function(data){
                const nodeDate = new Date(data.date).getTime();
                const listTime = new Date(list.date).getTime();
                return (nodeDate !== listTime);
            })
            
            this.parentNode.remove();
            // console.log(todoList)
            
            localStorage.setItem('todoList', JSON.stringify(todoList))
        }
    }

}

