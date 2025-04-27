<script>
    /* TODO管理アプリ。スマホで必ず見てください。
       以下のような機能が使えます。
       ・TODOの追加
       ・未完了のTODO
       ・未完了TODOの完了・削除
       ・完了のTODOを未完了に戻す */
    
    // オブジェクトの定義
    let obj = {
        notCompleteTodo: [],   // 未完了TODOのリスト
        completeTodo: [],      // 完了TODOのリスト
    };

    let notCompleteList = document.getElementById("notcomplete-list");
    let completeList = document.getElementById("complete-list");

    // 追加ボタンイベント
    // 追加ボタンが押されたら、入力されたTODOを取得
    let incomplete = () => {
        let inputText = document.getElementById("add-text").value;
        if (inputText == "") {
            return;
        }

        document.getElementById("add-text").value = "";  // 空文字にする
        obj.notCompleteTodo.push(inputText);   // 未完了のリストに追加
        addNotCompleteList();                  // 未完了リストに追加する関数を呼び出す
    }

    // 未完了リスト追加
    function addNotCompleteList() {
        notCompleteList.innerHTML = "";               

        obj.notCompleteTodo.forEach((item, index) => {         
            let div = document.createElement("div");               //未完了TODOにdiv要素追加
            div.className = "flex" ;                               //divのクラス名flex
            let li = document.createElement("li");                 //未完了TODOにli要素追加
            li.className = "li";
            li.textContent = item;  
            let completeButton = document.createElement("button"); // 未完了TODOに完了ボタン追加
            completeButton.className = "button";
            completeButton.textContent = "完了";
            let deleteButton = document.createElement("button");   // 未完了TODOに削除ボタン追加
            deleteButton.className = "button";
            deleteButton.textContent = "削除";

            // 親子関係を定義
            div.appendChild(li);
            div.appendChild(completeButton);
            div.appendChild(deleteButton);
            notCompleteList.appendChild(div);

            // 完了ボタンイベント
            completeButton.addEventListener("click", function() {completeButtonEvent(index, item)});
            // 削除ボタンリセット
            deleteButton.addEventListener("click", function() {notDeleteButtonEvent(index)});
        });
        saveData();  // 保存
    }

    // 完了ボタンイベント
    // 完了ボタンが押されたら、未完了TODOリストから削除・完了TODOリストに追加
    let completeButtonEvent = (index, item) => {
        obj.completeTodo.push(item);             // 完了リストに追加
        obj.notCompleteTodo.splice(index, 1);    // 未完了リストから削除
        addNotCompleteList();                    // 未完了リストを更新する関数を呼び出す
        addCompleteList();                       // 完了リストに追加する関数を呼び出す
    }

    // 未完了の削除ボタンイベント
    // 削除ボタンが押されたら、未完了TODOリストから削除
    let notDeleteButtonEvent = (index) => {
        obj.notCompleteTodo.splice(index, 1);   // 未完了TODOリストから削除
        addNotCompleteList();                   // 未完了リスト更新
    }

    // 完了の削除ボタンイベント
    // 削除ボタンが押されたら、未完了TODOリストから削除
    let deleteButtonEvent = (index) => {
        obj.completeTodo.splice(index, 1);   // 未完了TODOリストから削除
        addCompleteList();                   // 未完了リスト更新
    }

    // 完了リスト追加
    function addCompleteList() {
        completeList.innerHTML = "";                              // 完了のTODOの部分を初期化

        obj.completeTodo.forEach((item, index) => {       
            let div = document.createElement("div");              // 未完了TODOにdiv要素追加
            div.className = "flex" ;                              // divのクラス名flex
            let li = document.createElement("li");                // 未完了TODOにli要素追加
            li.className = "li";
            li.textContent = item;  
            let removeButton = document.createElement("button");  // 未完了TODOに戻すボタン追加
            removeButton.className = "button";
            removeButton.textContent = "戻す";
            let deleteButton = document.createElement("button");   // 未完了TODOに削除ボタン追加
            deleteButton.className = "button";
            deleteButton.textContent = "削除";

            // 親子関係を定義
            div.appendChild(li);
            div.appendChild(removeButton);
            div.appendChild(deleteButton);
            completeList.appendChild(div);

            // 戻すボタンイベント
            removeButton.addEventListener("click", function() {removeButtonEvent(index, item)});
            // 削除ボタンリセット
            deleteButton.addEventListener("click", function() {deleteButtonEvent(index)});
        });
        saveData();
    }


    // 戻るボタンイベント
    let removeButtonEvent = (index, item) => {
        obj.notCompleteTodo.push(item);       //未完了リストに追加
        obj.completeTodo.splice(index, 1);    //完了リストから削除

        addNotCompleteList();
        addCompleteList();
    }


    function saveData() {
            // オブジェクトをJSONに変換し、notCompleteTodoという名前でlocalStorageに保存
            localStorage.setItem("notCompleteTodo", JSON.stringify(obj.notCompleteTodo)); 
            // オブジェクトをJSONに変換し、completeTodoという名前でlocalStorageに保存
            localStorage.setItem("completeTodo", JSON.stringify(obj.completeTodo)); 
        }

    function loadData() {
            // localStorageからtodoという名前のデータを取り出し保存
            let notComplete = localStorage.getItem("notCompleteTodo"); 
            // 三項演算子という書き方(if文の代替)。dataに値があればJSONをオブジェクトに変換してobj.todoに代入、値がなければ[]を代入。
            obj.notCompleteTodo = notComplete ? JSON.parse(notComplete) : []; 

            // localStorageからtodoという名前のデータを取り出し保存
            let complete = localStorage.getItem("completeTodo"); 
            // 三項演算子という書き方(if文の代替)。dataに値があればJSONをオブジェクトに変換してobj.todoに代入、値がなければ[]を代入。
            obj.completeTodo = complete ? JSON.parse(complete) : []; 
            addNotCompleteList();
            addCompleteList();
        }

    // 追加ボタンが押されたら、追加ボタンイベントの関数を呼び出す
    document.getElementById("add-button").addEventListener("click", incomplete);  
</script>
