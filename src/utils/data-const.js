function findData(list, value, valueKey) {
  return ![undefined, null].includes(value) ? list.find(item => item[valueKey || 'value'] === value) || {} : list
}

export function projectTypeStatus(code) {
  const list = [
    {
      value: 1,
      text: 'FILECOIN'
    }, {
      value: 2,
      text: 'ETH'
    },
    // {
    //   value: 3,
    //   text: 'BTC'
    // },
    {
      value: 4,
      text: 'NEAR'
    }
  ]
  return findData(list, code)
}

export function runStatus(code) {
  const list = [
    {
      value: false,
      text: 'Normal',
      type: 'success'
    }, {
      value: true,
      text: 'Delete',
      type: 'danger'
    }
  ]
  return findData(list, code)
}

export function logOperType(code) {
  const list = [
    {
      value: 1,
      text: 'UserInfoLogType.Login'
    },
    {
      value: 2,
      text: 'UserInfoLogType.ChangePassword'
    },
    {
      value: 3,
      text: 'UserInfoLogType.ChangeDID'
    },
    {
      value: 4,
      text: 'UserInfoLogType.ChangeEmail'
    },
    {
      value: 5,
      text: 'UserInfoLogType.UnlockAccount'
    }
  ]
  return findData(list, code)
}
export function availableStatus(code) {
  const list = [
    {
      value: 1,
      text: 'Enable',
      type: 'success'
    }, {
      value: 2,
      text: 'Disabled',
      type: 'danger'
    }
  ]
  return findData(list, code)
}

export const docsHostMap = {
  dev: 'https://dev-node-gateway-docs.storeros.com',
  test: 'https://test-node-gateway-docs.storeros.com',
  prod: 'https://node-gateway-docs.storeros.com'
}
