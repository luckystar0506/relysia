class Token {
  constructor(to, supply, name, description, tokenImage) {
    this.coins = supply;
    this._owners = [to];
    this.name = name;
    this.description = description;
    this.tokenImage = tokenImage;
  }

  send(amount, to) {
    if (this.coins < amount) throw new Error();
    this.coins -= amount;
    return new Token(to, amount, this.name, this.description, this.tokenImage);
  }
}
