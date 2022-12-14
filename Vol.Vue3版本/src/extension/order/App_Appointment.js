import { h, resolveComponent } from 'vue';
let extension = {
  components: {
    //动态扩充组件或组件路径
    //表单header、content、footer对应位置扩充的组件
    gridHeader: '',
    gridBody: {
      render() {
        return h(
          resolveComponent('ElAlert'),
          {
            style: { 'margin-bottom': '12px' },
            'show-icon': true,
            type: 'success',
            closable: false
          },
          [
            h(
              'p',
              {},
              '1、 onInit(){ this.setFiexdSearchForm(true);  //设置固定显示所有查询条件}'
            ),
            h(
              'p',
              {},
              ' 2、 可在扩展js中的onInit方法设置this.tableHeight/tableMaxHeight属性，指定table高度(默认自适应)，如果设置 了tableMaxHeight属性，tableHeight则不会生效)'
            )
          ]
        );
      }
    },
    gridFooter: '',
    //弹出框(修改、编辑、查看)header、content、footer对应位置扩充的组件
    modelHeader: '',
    modelBody: '',
    modelFooter: ''
  },
  buttons: [], //扩展的按钮
  tableAction: 'App_Appointment', //指定菜单权限，其他任何页面引用时都会走对应权限
  text:
    '代码生成器中设置[是否只读]或如果没有编辑或新建权限弹出框都是只读的(点击用户姓名列可查看表单分组)',
  methods: {
    //事件扩展
    onInit() {

      //设置显示所有查询条件
      this.setFiexdSearchForm(true);

      //格式化单格颜色
      this.columns.forEach(x => {
        if (x.field == "PhoneNo") {
          x.cellStyle = (row, rowIndex, columnIndex) => {
            if (row.PhoneNo == "138888887698" && rowIndex == 0) {
              return { background: "#ddecfd" }
            }
          }
        }
        if (x.field == "Creator") {
          x.cellStyle = (row, rowIndex, columnIndex) => {
            if (row.Creator == "超级管理员") {
              return { background: "rgb(45 140 240)", color: "#ffff" }
            }
          }
        }
        
        if (x.field=='Name') {
          x.title="点击查看表单"
        }

      })

      //设置表单分组
      this.editFormOptions.splice(0, 0, [
        {
          colSize: 12,
          render: (h) => {
            return h(
              'div',
              {
                style: {
                  display: 'flex',
                  'margin-bottom': '-4px',
                  'line-height': '20px',
                  'margin-top': '-10px',
                  'padding-bottom': '5px',
                  'border-bottom': '1px solid #eee'
                }
              },
              [
                h('div', {
                  style: {
                    height: '19px',
                    background: '#2dced9',
                    width: '9px',
                    'border-radius': '10px'
                  }
                }),
                h(
                  'div',
                  {
                    style: {
                      'padding-left': '6px',
                      'font-weight': 'bold',
                      'font-size': '13px'
                    }
                  },
                  '基础信息'
                )
              ]
            );
          }
        }
      ]);


      this.editFormOptions.splice(2, 0, [
        {
          colSize: 12,
          render: (h) => {
            return h(
              'div',
              {
                style: {
                  display: 'flex',
                  'margin-bottom': '-4px',
                  'line-height': '20px',
                  'margin-top': '5px',
                  'padding-bottom': '5px',
                  'border-bottom': '1px solid #eee'
                }
              },
              [
                h('div', {
                  style: {
                    height: '19px',
                    background: '#2dced9',
                    width: '9px',
                    'border-radius': '10px'
                  }
                }),
                h(
                  'div',
                  {
                    style: {
                      'padding-left': '6px',
                      'font-weight': 'bold',
                      'font-size': '13px'
                    }
                  },
                  '其他信息'
                )
              ]
            );
          }
        }
      ])
    },

    onInited() {
      //多页签菜单打开时，重新设置表格的最大高度
      if (this.$route.path == '/tabsTable') {
        this.tableMaxHeight = document.body.clientHeight - 415;
      } else {
        //设置表的最大高度
        this.tableMaxHeight = this.height-125;//400
      }
      //移除快捷查询
      this.singleSearch = null;
    }
  }
};
export default extension;
