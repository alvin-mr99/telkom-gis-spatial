// Fix for react-virtualized missing export issue
// This file is injected by esbuild to provide the missing bpfrpt_proptype_WindowScroller export
if (typeof window !== 'undefined') {
  window.bpfrpt_proptype_WindowScroller = undefined;
}