import controllers from '../../../controllers/index';
import utils from '../../../utilities/utils';

async function init() {
  const query = utils.getUrlParams('q');
  const layout = document.querySelector('.follow-layout');
  const user = controllers.AuthController.authUser;
  renderPageHeader(query, layout);
  renderLayoutInner(layout); // Ensure layout inner is created before selecting it

  const layoutInner = document.querySelector('.layout-inner');
  renderSidebaar(query, layoutInner);
  renderNetworkWrapper(layoutInner);

  const networkData = await dataHandler(query, user.name);
  const layoutContent = document.querySelector('.layout-content');
  renderNetworkContent(networkData, layoutContent);
}

function renderLayoutInner(target) {
  const innerLayout = document.createElement('div');
  innerLayout.setAttribute('class', 'layout-inner flex');
  target.appendChild(innerLayout);
}

function renderPageHeader(q, target) {
  const title = q === 'followers' ? 'Followers' : 'Following author';
  const header = document.createElement('header');
  header.setAttribute('class', 'page-header py-4');
  header.innerHTML = `
    <h1 class="text-3xl font-bold text-gray-900">${title}</h1>
  `;
  target.appendChild(header);
}

function renderSidebaar(query, target) {
  const sidebar = document.createElement('div');
  sidebar.setAttribute('class', 'layout-sidebar flex flex-col shrink-0 px-8');
  sidebar.innerHTML = `
    <nav class="flex flex-col">
      <ul>  
        <li class="my-4 ${
          query === 'followers' ? 'border-b-2 border-indigo-600' : ''
        }">
          <a href="/follow/?q=followers"
            >Followers</a
          >
        </li>
        <li class="my-4 ${
          query !== 'followers' ? 'border-b-2 border-indigo-600' : ''
        }">
          <a href="/follow/?q=following_author"
            >Following author</a
          >
        </li>
      </ul>
    </nav>
  `;
  target.appendChild(sidebar);
}

function renderNetworkWrapper(target) {
  const layoutContent = document.createElement('div');
  layoutContent.setAttribute(
    'class',
    'layout-content grid grid-cols-4 gap-5 w-full justify-items-center align-items-center'
  );
  target.appendChild(layoutContent);
}

async function fetchNetwork(name) {
  try {
    const { data, meta } = await controllers.FollowController.network(name);
    return data;
  } catch (error) {
    console.error('Error fetching network:', error);
  }
}

async function dataHandler(query, name) {
  const data = await fetchNetwork(name);
  if (query === 'followers') {
    return data.followers;
  } else {
    return data.following;
  }
}

async function renderNetworkContent(networks, target) {
  networks.forEach((elem) => {
    const networkItem = document.createElement('div');
    networkItem.setAttribute('class', 'col-span-1 gap-4 flex flex-col items-center');

    networkItem.innerHTML = `
      <a class=""mb-4 href="/profile/?author=${elem.name}">
        <img class="h-16 w-16 rounded-full" src="${elem.avatar?.url}" alt="${elem.avatar?.alt}" loading="lazy" />
      </a>
      <div class="">
          <h3 class="text-xl font-bold hover:text-indigo-600"><a href="/profile/?author=${elem.name}">${elem.name}</a></h3>
      </div>
    `;

    target.appendChild(networkItem);
  });
}

init();
