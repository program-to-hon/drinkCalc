(function(){
    'use strict';

    //pcでもスマホでもボタン操作動くように変数定義
    var EVENTNAME_TOUCHSTART, EVENTNAME_TOUCHEND;

    if ('ontouchend' in document) {
        EVENTNAME_TOUCHSTART = 'touchstart';
        EVENTNAME_TOUCHEND = 'touchend';
    }else{
        EVENTNAME_TOUCHSTART = 'click';     //'mousedown' がいい場合もある
        EVENTNAME_TOUCHEND = 'mouseup';
    }

    //変数定義
    var price = document.getElementById('price');
    var num = document.getElementById('num');
    var unit = document.getElementById(`unit`);
    var btn = document.getElementById(`btn`);
    var result = document.getElementById(`result`);
    var reset = document.getElementById(`reset`);
    var resultPayLess = document.getElementById('resultPayLess');
    var resultShort = document.getElementById('resultShort');
    var resultPayMore = document.getElementById('resultPayMore');
    var resultOver = document.getElementById('resultOver');
    var myTable = document.getElementById('myTable');

    function checkInput() {
        //正規表現で入力内容チェック
        // /^ $/  で正規表現を挟む→1桁目1-9、2桁目以降0-9なので /^[1-9][0-9]*$/
        if(
            price.value.match(/^[1-9][0-9]*$/) !== null &&
            num.value.match(/^[1-9][0-9]*$/) !== null
        ) {
            btn.classList.remove('disabled');
        } else {
            btn.classList.add('disabled');
        }
    }

    btn.addEventListener(EVENTNAME_TOUCHSTART, function(){
        var payLess;
        var short;
        var payMore;
        var over;
        var str;

        if(this.classList.contains('disabled') === true) {
            return;
        }
        payLess = Math.floor(price.value /num.value /unit.value) * unit.value;
        short = price.value - (payLess * num.value);
        payMore = Math.ceil(price.value / num.value /unit.value) * unit.value;
        over = Math.abs(price.value - (payMore * num.value));
        if(short == 0 && over == 0) {
            str = '1人' + price.value / num.value + '円 ちょうどです！';
            myTable.classList.add('hiddenTable');
        } else {
            resultPayLess.textContent = payLess+'円';
            resultShort.textContent = short+'円'+'誰かが多く負担！';
            resultPayMore.textContent = payMore+'円';
            resultOver.textContent = '余り'+over+'円'+'誰かがもらえます！';
            result.textContent = '';
            myTable.classList.remove('hiddenTable');
        }
        result.textContent = str;
        reset.classList.remove('hidden');
        //お会計1000円を3人で割ったとき以下A.Bのパターンを考える
        //A. 300 (payLess)... 100 (short) 不足
        //B. 400 (payMore)... 200 (over) 余り
        //payLess = 1000 / 3;   //333.33333....
        //100円単位で考えるとさらに100で割る
        //payLess = 1000 /3 / 100;  //3.3333....
        //payLess = Math.floor(1000 /3 /100) * 100; //300
        //short = 1000 - (300 * 3); // 100
        //payMore = Math.ceil(1000 / 3 /100) * 100; //400
        //over = Math.abs(1000 - (400 * 3));  //200
    });

    price.addEventListener('keyup', checkInput);
    num.addEventListener('keyup', checkInput);

    reset.addEventListener(EVENTNAME_TOUCHSTART, function(){
        result.textContent = '金額、人数、何円単位で割るかを入れて計算ボタンをクリック！';
        price.value = '';
        num.value = '';
        unit.value = 100;
        btn.classList.add('disabled');
        this.classList.add('hidden');
        myTable.classList.add('hiddenTable');
        price.focus();
    });

    price.focus();

})();
