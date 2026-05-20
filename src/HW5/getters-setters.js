const userResult = {
    userName: 'Леся',
    scoreData: {
        baseScore: 80,
        bonusPoints: 20
    },
    get baseScore() {
        return this.scoreData.baseScore;
    },
    get bonusPoints() {
        return this.scoreData.bonusPoints;
    },
    set updateBonusPoints(value) {
        this.scoreData.bonusPoints = value;
    },
    calculateResultMessage() {
        this.totalScore = this.baseScore + this.bonusPoints;
        return `результат ${this.userName}: ${this.totalScore}`;
    }
};

console.log(userResult.calculateResultMessage());
userResult.updateBonusPoints = 30;
console.log(userResult.calculateResultMessage());
