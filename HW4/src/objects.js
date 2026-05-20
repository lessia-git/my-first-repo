const person = {
    name: 'Lesia',
    age: 43,
    address: {
        city: 'Київ',
        zip: '02000'
    },
    skills: ['JS', 'HTML', 'CSS'],
    show() {
        console.log(`${this.name} (${this.age}) з міста ${this.address.city}`);
        console.log(`Навички: ${this.skills.join(', ')}`);
    }
};

person.show();
person.address.city = 'Львів';
person.skills.push('React');
person.show();

