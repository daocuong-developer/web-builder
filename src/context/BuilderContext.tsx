import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Website, Page, Component, NavigationItem, ViewMode, HistoryState } from '../types/builder';

interface BuilderState {
  website: Website;
  currentPageId: string;
  selectedComponentId: string | null;
  viewMode: ViewMode;
  isDragging: boolean;
  isFirstTime: boolean;
  history: HistoryState[];
  historyIndex: number;
  clipboard: Component | null;
}

type BuilderAction = 
  | { type: 'SET_WEBSITE'; payload: Website }
  | { type: 'SET_CURRENT_PAGE'; payload: string }
  | { type: 'SET_SELECTED_COMPONENT'; payload: string | null }
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_DRAGGING'; payload: boolean }
  | { type: 'SET_FIRST_TIME'; payload: boolean }
  | { type: 'ADD_PAGE'; payload: Page }
  | { type: 'UPDATE_PAGE'; payload: { pageId: string; updates: Partial<Page> } }
  | { type: 'DELETE_PAGE'; payload: string }
  | { type: 'ADD_COMPONENT'; payload: { pageId: string; component: Component; parentId?: string; index?: number } }
  | { type: 'UPDATE_COMPONENT'; payload: { pageId: string; componentId: string; updates: Partial<Component> } }
  | { type: 'DELETE_COMPONENT'; payload: { pageId: string; componentId: string } }
  | { type: 'REORDER_COMPONENT'; payload: { pageId: string; componentId: string; newIndex: number } }
  | { type: 'DUPLICATE_COMPONENT'; payload: { pageId: string; componentId?: string } }
  | { type: 'COPY_COMPONENT' }
  | { type: 'PASTE_COMPONENT'; payload: { pageId: string; parentId?: string; index?: number } }
  | { type: 'UPDATE_NAVIGATION'; payload: NavigationItem[] }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SAVE_HISTORY' };

const initialWebsite: Website = {
  id: 'default',
  name: 'My Website',
  pages: [
    {
      id: 'home',
      name: 'Home',
      path: '/',
      isHome: true,
      components: []
    }
  ],
  navigation: [
    {
      id: 'nav-home',
      label: 'Home',
      pageId: 'home',
      order: 0
    }
  ],
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#14B8A6',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937'
  },
  settings: {
    favicon: '',
    googleAnalytics: '',
    metaPixel: '',
    customDomain: ''
  }
};

const initialState: BuilderState = {
  website: initialWebsite,
  currentPageId: 'home',
  selectedComponentId: null,
  viewMode: 'desktop',
  isDragging: false,
  isFirstTime: true,
  history: [],
  historyIndex: -1,
  clipboard: null
};

function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  const saveToHistory = (newState: BuilderState): BuilderState => {
    const historyState: HistoryState = {
      website: newState.website,
      currentPageId: newState.currentPageId,
      selectedComponentId: newState.selectedComponentId
    };
    
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(historyState);
    
    // Limit history to 50 items
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    return {
      ...newState,
      history: newHistory,
      historyIndex: newHistory.length - 1
    };
  };

  switch (action.type) {
    case 'SET_WEBSITE':
      return saveToHistory({ ...state, website: action.payload, isFirstTime: false });
    
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPageId: action.payload, selectedComponentId: null };
    
    case 'SET_SELECTED_COMPONENT':
      return { ...state, selectedComponentId: action.payload };
    
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    
    case 'SET_DRAGGING':
      return { ...state, isDragging: action.payload };
    
    case 'SET_FIRST_TIME':
      return { ...state, isFirstTime: action.payload };

    case 'REORDER_COMPONENT': {
      const reorderComponentsInList = (components: Component[]): Component[] => {
        const componentIndex = components.findIndex(c => c.id === action.payload.componentId);
        if (componentIndex === -1) return components;
        
        const [movedComponent] = components.splice(componentIndex, 1);
        components.splice(action.payload.newIndex, 0, movedComponent);
        
        return [...components];
      };
      
      const newState = {
        ...state,
        website: {
          ...state.website,
          pages: state.website.pages.map(page =>
            page.id === action.payload.pageId
              ? {
                  ...page,
                  components: reorderComponentsInList([...page.components])
                }
              : page
          )
        }
      };
      
      return saveToHistory(newState);
    }

    case 'COPY_COMPONENT': {
      if (!state.selectedComponentId) return state;
      
      const findComponent = (components: Component[]): Component | null => {
        for (const component of components) {
          if (component.id === state.selectedComponentId) {
            return component;
          }
          if (component.children) {
            const found = findComponent(component.children);
            if (found) return found;
          }
        }
        return null;
      };
      
      const currentPage = state.website.pages.find(p => p.id === state.currentPageId);
      if (!currentPage) return state;
      
      const componentToCopy = findComponent(currentPage.components);
      if (!componentToCopy) return state;
      
      return { ...state, clipboard: componentToCopy };
    }

    case 'PASTE_COMPONENT': {
      if (!state.clipboard) return state;
      
      const generateNewIds = (component: Component): Component => {
        const newComponent = {
          ...component,
          id: `${component.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
        
        if (newComponent.children) {
          newComponent.children = newComponent.children.map(generateNewIds);
        }
        
        return newComponent;
      };
      
      const newComponent = generateNewIds(state.clipboard);
      
      const addComponentToPage = (components: Component[], parentId?: string, index?: number): Component[] => {
        if (!parentId) {
          const newComponents = [...components];
          if (index !== undefined) {
            newComponents.splice(index, 0, newComponent);
          } else {
            newComponents.push(newComponent);
          }
          return newComponents;
        }
        
        return components.map(component => {
          if (component.id === parentId && component.children) {
            const newChildren = [...component.children];
            if (index !== undefined) {
              newChildren.splice(index, 0, newComponent);
            } else {
              newChildren.push(newComponent);
            }
            return { ...component, children: newChildren };
          }
          
          if (component.children) {
            return {
              ...component,
              children: addComponentToPage(component.children, parentId, index)
            };
          }
          
          return component;
        });
      };
      
      const newState = {
        ...state,
        website: {
          ...state.website,
          pages: state.website.pages.map(page =>
            page.id === action.payload.pageId
              ? {
                  ...page,
                  components: addComponentToPage(
                    page.components,
                    action.payload.parentId,
                    action.payload.index
                  )
                }
              : page
          )
        }
      };
      
      return saveToHistory(newState);
    }

    case 'DUPLICATE_COMPONENT': {
      const componentId = action.payload.componentId || state.selectedComponentId;
      if (!componentId) return state;
      
      const findAndDuplicateComponent = (components: Component[]): Component[] => {
        const result: Component[] = [];
        
        for (const component of components) {
          result.push(component);
          
          if (component.id === componentId) {
            const generateNewIds = (comp: Component): Component => {
              const newComp = {
                ...comp,
                id: `${comp.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
              };
              
              if (newComp.children) {
                newComp.children = newComp.children.map(generateNewIds);
              }
              
              return newComp;
            };
            
            result.push(generateNewIds(component));
          } else if (component.children) {
            result[result.length - 1] = {
              ...component,
              children: findAndDuplicateComponent(component.children)
            };
          }
        }
        
        return result;
      };
      
      const newState = {
        ...state,
        website: {
          ...state.website,
          pages: state.website.pages.map(page =>
            page.id === action.payload.pageId
              ? {
                  ...page,
                  components: findAndDuplicateComponent(page.components)
                }
              : page
          )
        }
      };
      
      return saveToHistory(newState);
    }

    case 'UNDO': {
      if (state.historyIndex > 0) {
        const previousState = state.history[state.historyIndex - 1];
        return {
          ...state,
          ...previousState,
          historyIndex: state.historyIndex - 1,
          history: state.history,
          clipboard: state.clipboard
        };
      }
      return state;
    }

    case 'REDO': {
      if (state.historyIndex < state.history.length - 1) {
        const nextState = state.history[state.historyIndex + 1];
        return {
          ...state,
          ...nextState,
          historyIndex: state.historyIndex + 1,
          history: state.history,
          clipboard: state.clipboard
        };
      }
      return state;
    }
    
    case 'ADD_PAGE': {
      const newNavItem: NavigationItem = {
        id: `nav-${action.payload.id}`,
        label: action.payload.name,
        pageId: action.payload.id,
        order: state.website.navigation.length
      };
      
      const newState = {
        ...state,
        website: {
          ...state.website,
          pages: [...state.website.pages, action.payload],
          navigation: [...state.website.navigation, newNavItem]
        }
      };
      
      return saveToHistory(newState);
    }
    
    case 'UPDATE_PAGE': {
      const newState = {
        ...state,
        website: {
          ...state.website,
          pages: state.website.pages.map(page =>
            page.id === action.payload.pageId
              ? { ...page, ...action.payload.updates }
              : page
          )
        }
      };
      
      return saveToHistory(newState);
    }
    
    case 'DELETE_PAGE': {
      const newState = {
        ...state,
        website: {
          ...state.website,
          pages: state.website.pages.filter(page => page.id !== action.payload),
          navigation: state.website.navigation.filter(nav => nav.pageId !== action.payload)
        },
        currentPageId: state.currentPageId === action.payload ? 'home' : state.currentPageId
      };
      
      return saveToHistory(newState);
    }
    
    case 'ADD_COMPONENT': {
      const addComponentToPage = (components: Component[], parentId?: string, index?: number): Component[] => {
        if (!parentId) {
          const newComponents = [...components];
          if (index !== undefined) {
            newComponents.splice(index, 0, action.payload.component);
          } else {
            newComponents.push(action.payload.component);
          }
          return newComponents;
        }
        
        return components.map(component => {
          if (component.id === parentId && component.children) {
            const newChildren = [...component.children];
            if (index !== undefined) {
              newChildren.splice(index, 0, action.payload.component);
            } else {
              newChildren.push(action.payload.component);
            }
            return { ...component, children: newChildren };
          }
          
          if (component.children) {
            return {
              ...component,
              children: addComponentToPage(component.children, parentId, index)
            };
          }
          
          return component;
        });
      };
      
      const newState = {
        ...state,
        website: {
          ...state.website,
          pages: state.website.pages.map(page =>
            page.id === action.payload.pageId
              ? {
                  ...page,
                  components: addComponentToPage(
                    page.components,
                    action.payload.parentId,
                    action.payload.index
                  )
                }
              : page
          )
        }
      };
      
      return saveToHistory(newState);
    }
    
    case 'UPDATE_COMPONENT': {
      const updateComponentInList = (components: Component[]): Component[] => {
        return components.map(component => {
          if (component.id === action.payload.componentId) {
            return { ...component, ...action.payload.updates };
          }
          
          if (component.children) {
            return {
              ...component,
              children: updateComponentInList(component.children)
            };
          }
          
          return component;
        });
      };
      
      const newState = {
        ...state,
        website: {
          ...state.website,
          pages: state.website.pages.map(page =>
            page.id === action.payload.pageId
              ? {
                  ...page,
                  components: updateComponentInList(page.components)
                }
              : page
          )
        }
      };
      
      return saveToHistory(newState);
    }
    
    case 'DELETE_COMPONENT': {
      const deleteComponentFromList = (components: Component[]): Component[] => {
        return components
          .filter(component => component.id !== action.payload.componentId)
          .map(component => {
            if (component.children) {
              return {
                ...component,
                children: deleteComponentFromList(component.children)
              };
            }
            return component;
          });
      };
      
      const newState = {
        ...state,
        website: {
          ...state.website,
          pages: state.website.pages.map(page =>
            page.id === action.payload.pageId
              ? {
                  ...page,
                  components: deleteComponentFromList(page.components)
                }
              : page
          )
        },
        selectedComponentId: state.selectedComponentId === action.payload.componentId 
          ? null 
          : state.selectedComponentId
      };
      
      return saveToHistory(newState);
    }
    
    case 'UPDATE_NAVIGATION': {
      const newState = {
        ...state,
        website: {
          ...state.website,
          navigation: action.payload
        }
      };
      
      return saveToHistory(newState);
    }
    
    default:
      return state;
  }
}

interface BuilderContextType {
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
  getCurrentPage: () => Page | undefined;
  getSelectedComponent: () => Component | null;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(builderReducer, initialState);
  
  // Auto-save to localStorage
  useEffect(() => {
    if (!state.isFirstTime) {
      const saveData = {
        website: state.website,
        currentPageId: state.currentPageId,
        isFirstTime: false,
        history: state.history,
        historyIndex: state.historyIndex
      };
      localStorage.setItem('builderData', JSON.stringify(saveData));
    }
  }, [state.website, state.currentPageId, state.isFirstTime, state.history, state.historyIndex]);
  
  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('builderData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.website && !data.isFirstTime) {
          dispatch({ type: 'SET_WEBSITE', payload: data.website });
          dispatch({ type: 'SET_CURRENT_PAGE', payload: data.currentPageId });
          dispatch({ type: 'SET_FIRST_TIME', payload: false });
        }
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);
  
  const getCurrentPage = () => {
    return state.website.pages.find(page => page.id === state.currentPageId);
  };
  
  const getSelectedComponent = (): Component | null => {
    if (!state.selectedComponentId) return null;
    
    const findComponent = (components: Component[]): Component | null => {
      for (const component of components) {
        if (component.id === state.selectedComponentId) {
          return component;
        }
        if (component.children) {
          const found = findComponent(component.children);
          if (found) return found;
        }
      }
      return null;
    };
    
    const currentPage = getCurrentPage();
    return currentPage ? findComponent(currentPage.components) : null;
  };
  
  const value = {
    state,
    dispatch,
    getCurrentPage,
    getSelectedComponent
  };
  
  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
}