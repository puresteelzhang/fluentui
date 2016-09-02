import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { DocumentCardBasicExample } from './examples/DocumentCard.Basic.Example';
import { DocumentCardCompleteExample } from './examples/DocumentCard.Complete.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';

const DocumentCardBasicExampleCode = require('./examples/DocumentCard.Basic.Example.tsx');
const DocumentCardCompleteExampleCode = require('./examples/DocumentCard.Complete.Example.tsx');

export class DocumentCardPage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState('Basic components', 'DocumentCard');
  }

  public render() {
    return (
      <ComponentPage
        title='DocumentCard'
        componentName='DocumentCardExample'
        exampleCards={
          [
            <ExampleCard title='DocumentCard Basic' code={ DocumentCardBasicExampleCode }>
              <DocumentCardBasicExample />
            </ExampleCard>,
            <ExampleCard title='DocumentCard Complete' code={ DocumentCardCompleteExampleCode }>
              <DocumentCardCompleteExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='DocumentCard' />
          ]
        }
        overview={
          <div>
             A card representation of a document. Can be configured with various card parts, including a preview, title, and location.
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }

}
