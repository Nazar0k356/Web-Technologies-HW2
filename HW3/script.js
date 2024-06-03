document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('text-input');
    const addButton = document.getElementById('product-add-btn');
    const itemsContainer = document.getElementById('list-section');
    const boughtContainer = document.getElementById('bought');
    const remainingContainer = document.getElementById('remaining');

    window.onload = function() {
        addItem("Помідори", 2, true);
        addItem("Печиво", 2, false);
        addItem("Сир", 1, false);
    };

    var map = new Map;

    addButton.addEventListener('click', () => {
        const text = inputText.value.trim();
        if (text !== '') {
            addItem(text, 1, false);
        } else {
            alert('Будь ласка, введіть текст.');
        }
    });


    function addItem(text, num, nonBought){
        if(map.has(text)){
            alert('Такий продукт вже існує');
            return;
        } else {
            map.set(text, 1);
        }
        //Додання лінії
        itemsContainer.appendChild(document.createElement('hr'));

        //Створення блока
        const item = document.createElement('div');
        item.classList.add('item');

        const summary_item = document.createElement('div');
        summary_item.classList.add("summary-item");
        
        const summary_text = document.createElement('span');
        summary_text.classList.add("summary-text");
        summary_text.textContent = text;
        
        const yellow_circle = document.createElement('span');
        yellow_circle.classList.add("count");
        yellow_circle.classList.add("yellow-circle");
        yellow_circle.textContent = num;

        summary_item.appendChild(summary_text);
        summary_item.appendChild(yellow_circle);
        if(nonBought){
            item.classList.add('status-not-bought');
            boughtContainer.appendChild(summary_item);
        } else {
            remainingContainer.appendChild(summary_item);
        }

        //Додання напису
        const item_name = document.createElement('span');
        item.appendChild(item_name);
        item_name.classList.add("item-name");
        item_name.textContent = text;
        item_name.addEventListener('click', () => {
            if(!window.getComputedStyle(item_name).textDecoration.includes('line-through')){
                const text = item_name.textContent.trim();
                map.delete(text);

                const input = document.createElement('input');
                input.type = 'text';
                input.value = text;
    
                item_name.replaceWith(input);
    
                input.focus();
    
                input.addEventListener('blur', () => {
                    const newText = input.value.trim();
                    if(newText !== ""){
                        if(map.has(newText)){
                            alert('Такий продукт вже існує');
                        } else {
                            input.replaceWith(item_name);
                            item_name.textContent = newText;
                            summary_text.textContent = newText;
                            map.set(newText, 1);
                        }
                    }
                });
            }
        });

        //Додання блоку контролю кількості 
        const quantity_control = document.createElement('div');
        item.appendChild(quantity_control);
        quantity_control.classList.add("quantity-control");

        const btn_minus = document.createElement('button');
        quantity_control.appendChild(btn_minus);
        btn_minus.classList.add("minus");
        btn_minus.classList.add("quantity-btn");
        btn_minus.textContent = '-';
        btn_minus.setAttribute('data-tooltip', 'Віднімання товару');

        const item_count = document.createElement('span');
        quantity_control.appendChild(item_count);
        item_count.classList.add("item-count");
        item_count.textContent = num;

        const btn_plus = document.createElement('button');
        quantity_control.appendChild(btn_plus);
        btn_plus.classList.add("plus");
        btn_plus.classList.add("quantity-btn");
        btn_plus.textContent = '+';
        btn_plus.setAttribute('data-tooltip', 'Додавання товару');

        btn_minus.addEventListener('click', () => {
            let currentNumber = parseInt(item_count.textContent, 10);
            if(currentNumber != 1){
                currentNumber -= 1;
                item_count.textContent = currentNumber;
                yellow_circle.textContent = currentNumber;
            }
        });

        btn_plus.addEventListener('click', () => {
            let currentNumber = parseInt(item_count.textContent, 10);
            currentNumber += 1;
            item_count.textContent = currentNumber;
            yellow_circle.textContent = currentNumber;
        });

        //Додання блоку контролю покупки
        const bought_panel = document.createElement('div');
        item.appendChild(bought_panel);
        bought_panel.classList.add("bought-panel");

        const btn_bought = document.createElement('button');
        bought_panel.appendChild(btn_bought);
        btn_bought.classList.add("bought");
        btn_bought.classList.add("grey-btn");
        btn_bought.classList.add("status-btn");
        btn_bought.textContent = 'Не куплено';
        btn_bought.setAttribute('data-tooltip', 'Зробити купленим');

        const btn_delete = document.createElement('button');
        bought_panel.appendChild(btn_delete);
        btn_delete.classList.add("delete-btn");
        btn_delete.textContent = '✖';
        btn_delete.setAttribute('data-tooltip', 'Прибрати товар');

        const btn_not_bought = document.createElement('button');
        bought_panel.appendChild(btn_not_bought);
        btn_not_bought.classList.add("not-bought");
        btn_not_bought.classList.add("grey-btn");
        btn_not_bought.classList.add("status-btn");
        btn_not_bought.textContent = 'Куплено';
        btn_not_bought.setAttribute('data-tooltip', 'Зробити не купленим');

        btn_bought.addEventListener('click', () => {
            item.classList.add('status-not-bought');
            summary_item.remove;
            boughtContainer.appendChild(summary_item);
        });

        btn_delete.addEventListener('click', () => {
            item.previousElementSibling.remove();
            item.remove();
            summary_item.remove;
            map.delete(item_name.textContent.trim());
        });

        btn_not_bought.addEventListener('click', () => {
            item.classList.toggle('status-not-bought');
            summary_item.remove;
            remainingContainer.appendChild(summary_item);
        });


        itemsContainer.appendChild(item);

        inputText.value = '';
    }
});
