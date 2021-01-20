// чтобы sass-loader корректно работал, указываем путь до файла scss
import '../style/main.scss';

let basket = {
    content: [],
    amount: 0,
    checkAmount: function(num){
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
        name: "Варежки",
        id: 1,
        price: 150,
        num: 0,
        putInBasket: function(){
            basket.content.push(this);
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
    },
    {
        name: "Фикус",
        id: 2,
        price: 3000,
        num: 0,
        putInBasket: function(){
            basket.content.push(this);
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
    },
    {
        name: "Пальма",
        id: 3,
        price: 15000,
        num: 0,
        putInBasket: function(){
            let exist_in_basket = false,
                position_in_basket = -1;
            for (let i=0; i<basket.content.length;i++){
                if (basket.content[i].id==this.id){
                    exist_in_basket = true;
                    position_in_basket = i;
                }
            }
            if (exist_in_basket){
                // basket.content[position_in_basket].num += this.num;
                // basket.checkAmount();
            }else{
                basket.content.push(this);
            }
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
    }];

if (basket.amount == 0){
    document.querySelector(".basketContent").innerHTML = `0 рублей`;
    document.querySelector(".basketList").innerHTML = `Ваша корзина пуста`;
}

let newCatalog = new DocumentFragment();
for (let i=0; i<Products.length; i++){
    let prodElem = document.createElement("div"),
        prodsImg = document.createElement("img");

    prodElem.classList.add("productElem");
    // prodsImg.setAttribute("src", `img/${i+1}.jpg`);
    prodsImg.setAttribute("src", `http://placehold.it/150x200`);

    prodElem.innerHTML = `<h4>${Products[i].name}</h4>
                            <div class="price">${Products[i].price} рублей</div>
                            <button data-id="${i}" class="btnMinus">-</button>
                            <input data-id="${i}" type="number" name="nunProd" value="1">
                            <button data-id="${i}" class="btnPlus">+</button><br>
                            <button data-id="${i}" class="btnBuyIt">Купить</button>`;
    prodElem.insertAdjacentElement("afterbegin", prodsImg);

    newCatalog.append(prodElem);
}
document.getElementById("catalog").append(newCatalog);

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
        Products[event.target.dataset.id].putInBasket();
    });
}

document.querySelector('.basket').addEventListener('click', ()=>{
    if (document.querySelector('.basketList').classList.contains("visible")){
        document.querySelector('.basketList').classList.remove("visible");
    }else{
        document.querySelector('.basketList').classList.add("visible");
    }
});