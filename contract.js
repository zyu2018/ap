'use strict'

var CoinItem = function(text){
    if(text){
        var obj = JSON.parse(text);
        this.title = obj.title;
        this.content = obj.content;
        this.author = obj.author;
    }
};

CoinItem.prototype = {
    toString : function(){
        return JSON.stringify(this)
    }
};

var Coin = function () {
    LocalContractStorage.defineMapProperty(this, "data", {
        parse: function (text) {
            return new CoinItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

Coin.prototype ={
    init:function(){
        
    },

    save:function(title,content){
        if(!title || !content){
            throw new Error("empty title or content")
        }

        if(title.length > 20 || content.length > 500){
            throw new Error("title or content  exceed limit length")
        }

        var from = Blockchain.transaction.from;
        var coinItem = this.data.get(title);
        if(coinItem){
            throw new Error("data has been occupied");
        }

        coinItem = new CoinItem();
        coinItem.author = from;
        coinItem.title = title;
        coinItem.content = content;

        this.data.put(title,coinItem);
    },

    get:function(title){
        if(!title){
            throw new Error("empty title")
        }
        return this.data.get(title);
    }
}

module.exports = Coin;