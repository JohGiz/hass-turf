class TurfMapCard extends HTMLElement {

    // Whenever the state changes, a new `hass` object is set. Use this to
    // update your content.
    set hass(hass) {
      
      // Initialize the content if it's not there yet.
      if (!this.content) {
        this.innerHTML = `
          <ha-card header="Turf-map">
            <div class="card-content">
            </div>
          </ha-card>
        `;
        this.content = this.querySelector("div");
      }
  
      const entityId = this.config.entity;
      const state = hass.states[entityId];
      const stateStr = state ? state.state : "unavailable";
  
      this.content.innerHTML = `
        Turf Map source ${entityId} data: ${stateStr}
        <br><br>
      `;
    }
  
    // The user supplied configuration. Throw an exception and Home Assistant
    // will render an error card.
    setConfig(config) {
      if (!config.entity) {
        throw new Error("You need to define an entity");
      }
      this.config = config;
    }
  
    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns in masonry view
    getCardSize() {
      return 3;
    }
  
    // The rules for sizing your card in the grid in sections view
    getLayoutOptions() {
      return {
        grid_rows: 3,
        grid_columns: 2,
        grid_min_rows: 3,
        grid_max_rows: 3,
      };
    }
  }
  
  customElements.define("turf-map-card", TurfMapCard);