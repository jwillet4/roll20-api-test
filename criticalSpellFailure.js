on('chat:message', (msg) => {
    if (msg.rolltemplate !== 'atk') return;
    const spellLevel = msg.content.match(/{{spelllevel=(.*?)}}/g)[0]
        .replace('{{spelllevel=', '')
        .replace('}}', '');
    if (!spellLevel.length) return;
    if (msg.inlinerolls[0].results.rolls[0].results[0].v !== 1) return;

    const charName = msg.content.match(/charname=(.*?)$/g)[0]
        .replace('charname=', '');
    let charId = findObjs({
        _type: "character",
        name: charName
    })[0].get('_id');
    let tokens = findObjs({
        _type: 'graphic',
        represents: charId
    })
    _.each(tokens, (token) => {
        spawnFx(token.get("left"), token.get('top'), 'explode-fire', token.get('pageid'));
    })
});