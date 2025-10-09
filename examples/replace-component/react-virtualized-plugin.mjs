// Custom esbuild plugin to fix react-virtualized missing export issue
const reactVirtualizedPlugin = {
  name: 'react-virtualized-fix',
  setup(build) {
    // Intercept the problematic WindowScroller file
    build.onLoad({ filter: /react-virtualized.*WindowScroller\.js$/ }, async (args) => {
      const fs = await import('fs');
      
      try {
        let contents = fs.readFileSync(args.path, 'utf8');
        
        // Add the missing export at the end
        contents += '\nexport const bpfrpt_proptype_WindowScroller = undefined;\n';
        
        return {
          contents,
          loader: 'js'
        };
      } catch (error) {
        console.log('Error reading file:', args.path, error);
        return null;
      }
    });
  }
};

export { reactVirtualizedPlugin };