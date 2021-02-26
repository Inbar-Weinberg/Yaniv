class Player{
    constructor(name = 'John Doe'){
        this.name = name;
        this.hand = new PlayerHand();
        this.score = 0;
    }
    
}