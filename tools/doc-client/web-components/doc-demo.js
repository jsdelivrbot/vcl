
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

export default class DocDemo extends PolymerElement {
  static get template() {
    return html`
    <link rel="stylesheet" href="../vcl.css" media="screen" charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <div id="docDemo">
      <div class="vclTabbable">
        <div class="vclTabs vclTabStyleUni" role="tablist">
          <div class$="vclTab  {{getDemoTabClass(codeVisible)}}"  on-click="showDemo" role="tab">
            <span class="vclTabLabel vclIcon fa fa-eye"></span>
            <span class="vclTabLabel">Demo</span>
          </div>
          <div class$="vclTab {{getCodeTabClass(codeVisible)}}" on-click="showCode" role="tab">
            <span class="vclTabLabel vclIcon fa fa-code"></span>
            <span class="vclTabLabel">Code</span>
          </div>
  
          <form class$="docEditDemoButton vclHalfTransparent {{getCodeTextClass(codeVisible)}}" action="https://codepen.io/pen/define" method="POST" target="_blank">
            <input type="hidden" name="data" value$="{{codePen}}">
            <button class="vclButton vclHalfTransparent">
              <div class="vclIcogram">
                <div class="vclIcon fa fa-codepen" aria-hidden="true" role="img"></div>
                <span class="vclText">Edit on CodePen</span>
              </div>
            </button>
          </form>
        </div>
        <div class="vclTabContent">
          <div on-click="demoClick" id="ninja" name="ninja" role="tabpanel" class$="vclTabPanel docDemoContent vclTransparent shadow {{getDemoClass(codeVisible)}}"></div>
          <div role="tabpanel" class$="vclTabPanel code {{getCodeTextClass(codeVisible)}}">
            <pre ref="source" name="source">[[markdown]]</pre>
          </div>
        </div>
      </div>
    </div>`;
  }

  static get is() { return 'doc-demo'; }

  static get properties() {
    return {
      markdown: {
        type: Object,
        observer: 'renderNinja'
      },
      style: {
        observer: 'updateCss'
      },
      codePen: {
        computed:'computeCodePen(markdown,style)'
      }

    };
  }

  constructor() {
    super();
    this.codeVisible = false;
  }
  computeCodePen(markdown, style) {
    const codePen = {
      html:markdown,
      css: style
    }
    return codePen;
  }
  updateCss(style){
    const cont = document.createElement('template');
    cont.innerHTML = `<style>${style}</style> `
    this.$.docDemo.appendChild(cont.content);
  }

  renderNinja(markdown) {
    this.$.ninja.innerHTML = markdown;
  }

  getCodeTextClass(codeVisible) {
    return !codeVisible ? 'vclDisplayNone' : '';
  }

  getDemoClass(codeVisible) {
    return codeVisible ? 'vclDisplayNone' : '';
  }

  getDemoTabClass(codeVisible) {
    return !codeVisible ? 'vclSelected' : '';
  }

  getCodeTabClass(codeVisible) {
    return codeVisible ? 'vclSelected' : '';
  }

  showCode() {
    this.codeVisible = true;
  }

  showDemo() {
    this.codeVisible = false;
  }
}
customElements.define(DocDemo.is, DocDemo);
