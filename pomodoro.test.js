let {displayMinutes} = require('./pomodoro.js'); 

test('displayMinutes',  () => {
    expect(displayMinutes(0)).toBe(0);
})