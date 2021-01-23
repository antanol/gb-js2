// чтобы sass-loader корректно работал, указываем путь до файла scss
import '../style/main.scss';

function putInBasket(){
    let alreadyExist = basket.content.find(item => {
        if (item.name == this.name){
            return true;
        }
    });
    if (!alreadyExist){
        basket.content.push(this);
    };
    if (!document.querySelector(".basketElem")) {
        document.querySelector(".basketList").innerHTML = `<div class="basketElem"><img src="http://placehold.it/50x50">
            <b>${this.name}</b>
            <div class="price">${this.num}шт. на ${this.price*this.num} рублей</div></div>`;
    }else{
        document.querySelector(".basketList").innerHTML += `<div class="basketElem"><img src="http://placehold.it/50x50">
            <b>${this.name}</b>
            <div class="price">${this.num}шт. на ${this.price*this.num} рублей</div></div>`;
    }
    basket.checkAmount(this.num);
}

let basket = {
    content: [],
    amount: 0,
    checkAmount: (num) =>{
        let temp_count = 0;
        for (let i=0; i<this.content.length; i++){
            temp_count += num * this.content[i].price;
        }

        this.amount = temp_count;
        document.querySelector(".basketContent").innerHTML = `${this.amount} рублей`
    }
};

let Products = [
    {
        name: 'Notebook',
        id: 1,
        price: 2000,
        num: 0
    },
    {
        name: 'Mouse',
        id: 2,
        price: 20,
        num: 0
    },
    {
        name: 'Keyboard',
        id: 3,
        price: 200,
        num: 0
    },
    {
        name: 'Gamepad',
        id: 4,
        price: 50,
        num: 0
}];

// стартовое состояние 
if (basket.amount == 0){
    document.querySelector(".basketContent").innerHTML = `0 рублей`;
    document.querySelector(".basketList").innerHTML = `Ваша корзина пуста`;
}

//Функция для формирования верстки каждого товара
const renderProduct = (elem = Products[0], i = 0) => {
    return `<div class="productElem">
                <img src="http://placehold.it/150x200">
                <h4>${elem.name}</h4>
                <div class="price">${elem.price} рублей</div>
                <button data-id="${i}" class="btnMinus">-</button>
                <input data-id="${i}" type="number" name="nunProd" value="1">
                <button data-id="${i}" class="btnPlus">+</button><br>
                <button data-id="${i}" class="btnBuyIt">Купить</button>
            </div>`;
};

const renderPage = (list) => {
    const newCatalog = list.map((item, index) => renderProduct(item, index));
    for (let elem of newCatalog){
        document.getElementById("catalog").innerHTML += elem;
    }
};
renderPage(Products);

// обработка кнопок
let btnsMinus = document.querySelectorAll('.btnMinus'),
    btnsPlus = document.querySelectorAll('.btnPlus'),
    btnsBuy = document.querySelectorAll('.btnBuyIt');
for (let btn of btnsMinus){
    btn.addEventListener('click', (event)=>{
        if (document.querySelector(`input[data-id="${event.target.dataset.id}"]`).value > 1){
            document.querySelector(`input[data-id="${event.target.dataset.id}"]`).value--;
        }
    });
}

for (let btn of btnsPlus){
    btn.addEventListener('click', (event)=>{
        document.querySelector(`input[data-id="${event.target.dataset.id}"]`).value++;
    });
}

for (let btn of btnsBuy){
    btn.addEventListener('click', (event)=>{
        Products[event.target.dataset.id].num += Number(document.querySelector(`input[data-id="${event.target.dataset.id}"]`).value);
        // ранее функция была в каждом объекте. Изучим конструкторы - запихну в него.
        // Но т.к. в объекте this относился к объекту, здесь пришлось изменить контекст с помощью бинда.
        let putThis = putInBasket.bind(Products[event.target.dataset.id]);
        putThis();
    });
}

document.querySelector('.basket').addEventListener('click', ()=>{
    if (document.querySelector('.basketList').classList.contains("visible")){
        document.querySelector('.basketList').classList.remove("visible");
    }else{
        document.querySelector('.basketList').classList.add("visible");
    }
});