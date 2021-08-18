  // import axios from 'axios'
  
  // initial state
  const state = () => ({
    page_title: '',
    plans: [],
    tabs: [],
    selectedContent: 0
  })

  const dataFetch = async (url) => {
    const response = await fetch(url);
    const extracted = await response.json();
    console.log(extracted);

    return extracted;
  }
  
  // getters
  const getters = {}
  
  // actions
  const actions = {

    fetchInitial({ commit }) {
      dataFetch('/test_data.json').then(initData => {
        commit('setValues', initData)
      }).catch(e => console.log(e))
    },

    changeContent({ commit }, contentIndex) {
      commit('selectContent', contentIndex)
    },

    uploadSystem({ commit, state }, systems) {
      let currentSystems = [...state.tabs[state.selectedContent].data.systems]
      
      console.log(currentSystems);

      const formatDate = (value) => {
        let date = new Date(value);
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        return `${day} ${month} ${year}`;
      }
    
        
      systems.forEach(sys => {

        let filesize = ((sys.size/1024)/1024).toFixed(5); // MB

        if (filesize <= 5) {
          let uploadTime = new Date();
          currentSystems.push({
            id: currentSystems.length > 0 ? 
              (currentSystems[currentSystems.length - 1].id + 1) : 0,
            system_name: sys.name.split('.')[0],
            created_date: formatDate(uploadTime),
            active_licenses: 0
          })
        } else {
          alert('Max size of file is 5MB')
        }
      })

    //   let formData = new FormData();
    //   formData.append('file', file);
      commit('saveSystems', currentSystems);
    },

    removeSystem({ commit }, sys_id) {
      commit('removeSelectedSystem', sys_id)
    },

    updateSystem({ commit }, subsystem) {
      commit('addSubsystem', {subsystem, sys_id: subsystem.system_id});
    }
  
  }
  
  // mutations
  const mutations = {

    selectContent(state, indx) {
      state.selectedContent = indx;
    },

    setValues (state, initData) {
      let filteredTabs = [...initData.tabs.map(tab => {
        return {
          ...tab,
          title: tab.title,
          value: tab.title.replace(' ', '')
        }
      })]
      console.log(filteredTabs, 'filtered tabs');
      state.page_title = initData.page_title
      state.plans = initData.plans
      state.tabs = filteredTabs
    },

    saveSystems (state, systems) {
        state.tabs[state.selectedContent].data.systems = systems;
    },

    addSubsystem (state, {subsystem, sys_id}) {
        state.tabs[state.selectedContent].data.subsystems.push(subsystem);
        state.tabs[state.selectedContent].data.systems.find(sys => 
          (sys.id === sys_id) && sys.active_licenses++);

        console.log(state.tabs[state.selectedContent].data.systems, state.tabs[state.selectedContent].data.subsystems);
    },

    removeSelectedSystem(state, sys_id) {
      let afterRemoval = [...state.tabs[state.selectedContent].data.systems].filter(sys => sys.id !== sys_id)
      state.tabs[state.selectedContent].data.systems = afterRemoval;
    }

  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }