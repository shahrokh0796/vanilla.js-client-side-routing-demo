class Router {
  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoute();
  }

  loadRoute(...urlSegments) {

    const matchedRoute = this._matchUrlToRoute(urlSegments);
    if(!matchedRoute) {
      console.error(`No Route matched for url segments: ${urlSegments}`);
      return;
    }

    const url = `/${urlSegments.join('/')}`;
    console.log(url);
    history.pushState({}, '', url);

    const routerOutletElement = document.querySelectorAll('[data-router-outlet]')[0];
    routerOutletElement.innerHTML = matchedRoute.getTemplate(matchedRoute.params);
  }

  _matchUrlToRoute(urlSegments) {
    
    const routeParams = {};
    const matchedRoute = this.routes.find( route => {
      const routePathSegements = route.path.split('/').slice(1);

      if(routePathSegements.length !== urlSegments.length) {
        return false;
      }

      const match = routePathSegements.every((routePathSegment, i) => {
        if(routePathSegment[0] === ':') {
          const propName = routePathSegment.slice(1);
          routeParams[propName] = decodeURIComponent(urlSegments[i])
          return true;
        }
        return routePathSegment === urlSegments[i];
      });

      if(match) {
        routePathSegements.forEach((segment, i) => {
          const propName = segment.slice(1);
          routeParams[propName] = decodeURIComponent(urlSegments[i]);
        });
      }

      return match;
    });

    return matchedRoute ? {...matchedRoute, params: routeParams} : null;
  }

  _loadInitialRoute() {
    const pathname = window.location.pathname;

    let pathnameSplit;
    if(pathname.includes('index.html')) {
      pathnameSplit = [''];
    } else {
      pathnameSplit = pathname.split('/').filter(segment => segment > 0);
    }

    const pathSegments = pathnameSplit.length > 0 ? pathnameSplit : [''];
    this.loadRoute(...pathSegments);
  }
  
}