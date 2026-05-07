import { uuid } from 'mu';
import { DiagramListItemRequestBody } from '../types';

export function diagramsToContext(
  diagramsData: Array<DiagramListItemRequestBody | string>,
  versionNumber = 0,
) {
  if (!diagramsData || diagramsData.length === 0) {
    return null;
  }

  const now = new Date().toISOString();
  const listNodeId = uuid();
  return {
    type: 'DiagramList',
    '@id': listNodeId,
    uuid: listNodeId,
    order: 'https://schema.org/ItemListUnordered',
    version: `v0.0.${versionNumber}`,
    created: now,
    modified: now,
    'diagram-list-items': diagramsData.map((uriOrObject, index) => {
      let position = index + 1;
      let fileUri = uriOrObject;
      if (
        typeof uriOrObject === 'object' &&
        typeof uriOrObject.position === 'number'
      ) {
        position = uriOrObject.position;
      }
      if (
        typeof uriOrObject === 'object' &&
        typeof uriOrObject.fileUri === 'string'
      ) {
        fileUri = uriOrObject.fileUri;
      }

      const listItemNodeId = uuid();
      return {
        type: 'DiagramListItem',
        '@id': listItemNodeId,
        uuid: listItemNodeId,
        position: position,
        diagramFile: fileUri,
        created: now,
        modified: now,
      };
    }),
  };
}

export function linksToContext(linkUrls: Array<string>) {
  if (!linkUrls || linkUrls.length === 0) {
    return null;
  }

  const now = new Date().toISOString();
  return linkUrls.map((uri) => {
    const linkNodeId = uuid();
    const href = uri;
    return {
      type: 'Bookmark',
      '@id': linkNodeId,
      uuid: linkNodeId,
      label: href,
      href: href,
      modified: now,
    };
  });
}
