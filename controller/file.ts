import { sparqlEscapeUri, query } from 'mu';

export async function fileWithUriExists(fileUri: string): Promise<boolean> {
  const sparqlResult = await query(
    `
    PREFIX nfo: <http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#>
    PREFIX mu: <http://mu.semte.ch/vocabularies/core/>

    ASK {
      ${sparqlEscapeUri(fileUri)} a nfo:FileDataObject .
      ${sparqlEscapeUri(fileUri)} mu:uuid ?uuid .
    }
    `,
  );

  return Boolean(sparqlResult.boolean);
}
