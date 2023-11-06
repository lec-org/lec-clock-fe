export function debounceAsync(this: any, func:Function, wait:number = 500):Function {  
    let timeout:number | undefined;  
    const context = this;
    return async function (...args:any[]) {  
      if (timeout) {  
        clearTimeout(timeout);  
      }  
      timeout = setTimeout(() => {  
        func.apply(context, args);  
      }, wait);  
    };  
  }