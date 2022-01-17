rollInitiative();

async function rollInitiative() {
    if (canvas.tokens.controlled.length === 0) return ui.notifications.error("No tokens selected")
    await canvas.tokens.toggleCombat()
    const tieBreakerCheck = game.settings.get("dnd5e", "initiativeDexTiebreaker") ? 1 : 0
    const initiatives = canvas.tokens.controlled.map(token => {
        const chosenActor = token.actor
        const init = chosenActor.data.data.attributes.init.total
        const tieBreaker = chosenActor.data.data.abilities.dex.value / 100
        const roll = new Roll(`1d20 + ${init} + 1d8 + ${tieBreaker * tieBreakerCheck}`).roll({async: false})
        roll.toMessage({speaker: ChatMessage.getSpeaker({token: token})})
        const combatantId = game.combat.combatants.find(combatant => combatant.name === token.name).id
        console.log(roll.total)
        return{
            id: combatantId,
            initiative: roll.total,
        }
    })
    initiatives.forEach(setInit)
}

async function setInit(init) {
    await game.combat.setInitiative(init.id, init.initiative)
}