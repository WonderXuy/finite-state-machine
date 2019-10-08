class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this._config = config;
        this.currentState = this._config["initial"];
        this.History = [];
        this.arrRedo = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        try{
        if(state in this._config['states']){
        for(let key in this._config['states']){
            if(key==state){
                this.History.push(this.currentState);
                this.arrRedo.length = 0;
                this.currentState = state;
                break;
            }
        }
    }
    else{
        throw new Error('is not existing transition of FSM');
    }
}
finally{

}
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        try{
        for(let states in this._config["states"]){
            if(states==this.currentState){
            for(let transitions in this._config["states"][states]){
                if(event in this._config["states"][states][transitions]){
                for(let key in this._config["states"][states][transitions]){
                    if(key==event){
                        this.History.push(this.currentState);
                        this.arrRedo.length = 0;
                        this.currentState = this._config["states"][states][transitions][key];
                        return;
                    }
                }
            }
            else{
            throw new Error('is not existing event in corrent state of FSM');
            }
            }
        }
        }
    }
    finally{

    }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.History.push(this.currentState);
        this.currentState = this._config["initial"];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event="") {
        let result = [];
        if(event == ""){
            for(let key in this._config["states"]){
                result.push(key);
            }
        }
        else{
            for(let states in this._config["states"]){
                for(let transitions in this._config["states"][states]){
                    for(let key in this._config["states"][states][transitions]){
                        if(key==event){
                            result.push(states);
                        }
                    }
                }
            }
        }
        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.History.length>0){
           
            this.arrRedo.push(this.currentState);
            this.currentState = this.History.pop();
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.arrRedo.length>0){
            this.currentState = this.arrRedo.pop();
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.History.length = 0;
        this.arrRedo.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
