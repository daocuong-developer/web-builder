import React, { useState } from 'react';
import { useBuilder } from '../context/BuilderContext';
import { 
  Plus, 
  Trash2, 
  Home, 
  FileText,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export function PageManager() {
  const { state, dispatch } = useBuilder();
  const [isExpanded, setIsExpanded] = useState(true);
  const [showNewPageForm, setShowNewPageForm] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  
  const handleAddPage = () => {
    if (!newPageName.trim()) return;
    
    const pageId = newPageName.toLowerCase().replace(/\s+/g, '-');
    const newPage = {
      id: pageId,
      name: newPageName,
      path: `/${pageId}`,
      components: [],
      isHome: false
    };
    
    dispatch({ type: 'ADD_PAGE', payload: newPage });
    setNewPageName('');
    setShowNewPageForm(false);
  };
  
  const handleDeletePage = (pageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (state.website.pages.length <= 1) return;
    
    if (confirm('Are you sure you want to delete this page?')) {
      dispatch({ type: 'DELETE_PAGE', payload: pageId });
    }
  };
  
  const handleSelectPage = (pageId: string) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: pageId });
  };
  
  return (
    <div className="border-t border-gray-200">
      <div className="p-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">Pages</span>
            <span className="text-xs text-gray-500">({state.website.pages.length})</span>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </button>
        
        {isExpanded && (
          <div className="mt-3 space-y-1">
            {state.website.pages.map((page) => (
              <div
                key={page.id}
                onClick={() => handleSelectPage(page.id)}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                  page.id === state.currentPageId
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {page.isHome ? (
                    <Home className="w-4 h-4" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{page.name}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  {!page.isHome && (
                    <button
                      onClick={(e) => handleDeletePage(page.id, e)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {showNewPageForm ? (
              <div className="p-2 border border-gray-300 rounded-md">
                <input
                  type="text"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  placeholder="Page name"
                  className="w-full px-2 py-1 text-sm border-none outline-none"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddPage();
                    if (e.key === 'Escape') setShowNewPageForm(false);
                  }}
                />
                <div className="flex justify-end space-x-1 mt-2">
                  <button
                    onClick={() => setShowNewPageForm(false)}
                    className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPage}
                    className="px-2 py-1 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowNewPageForm(true)}
                className="flex items-center space-x-2 w-full p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Page</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}