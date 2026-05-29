import { Inject } from '@nestjs/common';
import { orm } from './helper';
import { ConnectionService } from 'src/shared/assets/connection';
import { closeConnection, ormEntity } from './helper/ormEntity';

export function daily(names?: any): PropertyDecorator {
  return _daily(names || {});
}

const _daily = ({ ...names }): PropertyDecorator => {
  const allowFunctionNames = ['orm', 'ormEntity', 'closeConnection'];
  return (
    target,
    _key?: string | symbol,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    if (_key && !allowFunctionNames.includes(_key.toString())) {
      return;
    }

    Inject(ConnectionService)(target, 'connectionService');

    if (descriptor) {
      descriptor.value = async function ({ ...args }) {
        let _return = {};
        const defaultOptions = {
          names,
          args,
          services: {
            connectionService: this.connectionService,
          },
        };
        switch (_key) {
          case 'orm':
            _return = await orm(defaultOptions);
            break;

          case 'ormEntity':
            _return = await ormEntity(defaultOptions);
            break;

          case 'closeConnection':
            _return = await closeConnection(defaultOptions);
            break;

          default:
            break;
        }
        return _return;
      };
    }
  };
};
