on('chat:message', (msg) => {
    if(msg.type !== 'api' || msg.content.indexOf('!hotdq-death-save') === -1) return;
    const result = randomInteger(20)
    if (result === 1) {
        sendChat('God', `/w gm <h2>You rolled a ${result}...</h2><p>Add 2 failed death saves</p>`);
        sendChat('God', `/w ${msg.who} <h2>You rolled a ${result}...</h2><p>Add 2 failed death saves</p>`);
    }
    else if (result === 20) {
        sendChat('God', `/w gm <h2>You rolled a ${result}!</h2><p>You jump up with 1 hp</p>`);
        sendChat('God', `/w ${msg.who} <h2>You rolled a ${result}!</h2><p>You jump up with 1 hp</p>`);
    }
    else if (result < 10) {
        sendChat('God', `/w gm <h2>You rolled a ${result}</h2><p>Add 1 failed death save</p>`);
        sendChat('God', `/w ${msg.who} <h2>You rolled a ${result}</h2><p>Add 1 failed death save</p>`);
    }
    else {
        sendChat('God', `/w gm <h2>You rolled a ${result}</h2><p>Add 1 successful death save</p>`);
        sendChat('God', `/w ${msg.who} <h2>You rolled a ${result}</h2><p>Add 1 successful death save</p>`);
    }
});