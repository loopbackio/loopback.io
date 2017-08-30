LoopBack project files and directories are in the _application root directory_.
Within this directory the standard LoopBack project structure has these sub-directories:

* `server` - Node application scripts and configuration files.
* `client` - Client JavaScript, HTML, and CSS files (**LoopBack tools only**).
* `common` - Files common to client and server. The `/models` sub-directory contains model JSON and JavaScript files.  
* `definitions` - API and product definition YAML files (**IBM API Connect only**).

{% include note.html content="Model JSON and JavaScript files that are shared between client and server go in the `/common/models` directory.  Server-only files go in `/server/models`, and client-only go in`/client/models`
" %}

<table style="font-size: 90%;">
  <thead>
    <tr>
      <th width="200">File or directory</th>
      <th>Description</th>
      <th width="180">How to access in code</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <th colspan="3" style="text-align: center; background-color: #bfbfbf;">Top-level application directory</th>
    </tr>
    <tr>
      <td><code>/node-modules</code> directory</td>
      <td>Contains Node packages as specified as dependencies in <code>package.json</code>. Update with <code>npm install</code>.</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>
          <code><a href="package.json.html">package.json</a></code>
      </td>
      <td>
        Standard npm package specification. See <a href="package.json.html">package.json</a>.
      </td>
      <td>N/A</td>
    </tr>
    <tr>
      <td><code>README.md</code></td>
      <td>Stub file for internal documentation.</td>
      <td>N/A</td>
    </tr>
    <tr>
      <th colspan="3" style="text-align: center; background-color: #bfbfbf;">/server directory - Node application files</th>
    </tr>
    <tr>
      <td><code>/boot</code> directory</td>
      <td>Add scripts to perform initialization and setup. See <a href="Events.html">boot scripts</a>.</td>
      <td>Scripts are automatically executed in alphabetical order.</td>
    </tr>
    <tr>
      <td><code>/models</code> directory</td>
      <td>Server-only model definitions.</td>
      <td>Node:<br><code>myModel = <br/>app.models.myModelName</code></td>
    </tr>    
    <tr>
      <td><code><a href="component-config.json">component-config.json</a></code></td>
      <td>Specifies <a href="LoopBack-components.html">LoopBack components</a> to load.</td>
      <td>Created by Strongloop tools only. Not used in API Connect.</td>
    </tr>
    <tr>
      <td><code><a href="config.json.html">config.json</a></code></td>
      <td>Application settings. See <a href="config.json.html">config.json</a>.</td>
      <td><code>app.get('setting-name')</code></td>
    </tr>
    <tr>
      <td><code><a href="datasources.json.html">datasources.json</a></code></td>
      <td>Data source configuration file. See <a href="datasources.json.html">datasources.json</a>. For an example, see <a href="Create-new-data-source.html">Create new data source</a>.</td>
      <td><code>app.datasources['datasource-name']</code></td>
    </tr>
    <tr>
      <td><code><a href="middleware.json.html">middleware.json</a></code></td>
      <td>Middleware definition file. For more information, see <a href="Defining-middleware.html">Defining middleware</a>.</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td><code><a href="middleware.development.json">middleware.development.json</a></code></td>
      <td>Middleware definition file with development configuration. For more information, see <a href="Defining-middleware.html">Defining middleware</a>.

      See <a href="Preparing-for-deployment.html">Preparing for deployment</a>.</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td><code><a href="model-config.json.html">model-config.json</a></code></td>
      <td>Model configuration file. See <a href="model-config.json.html">model-config.json</a>. For more information,
          see <a href="Connecting-models-to-data-sources.html">Connecting models to data sources</a>.</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td><code><a href="server.js.html">server.js</a></code></td>
      <td>Main application program file.</td>
      <td>N/A</td>
    </tr>
    <tr>
      <th colspan="3" style="text-align: center; background-color: #bfbfbf;">/client directory - Client application files</th>
    </tr>
    <tr>
      <td>README.md</td>
      <td>LoopBack generators create empty <code>README.md</code> file.</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Other</td>
      <td>Add your HTML, CSS, client JavaScript files.</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <th colspan="3" style="text-align: center; background-color: #bfbfbf;">/common directory - shared application files</th>
    </tr>
    <tr>
      <td><code>/models</code> directory</td>
      <td>
        Custom model files:
        <ul>
          <li><a href="Model-definition-JSON-file.html">Model definition JSON files</a>, by convention named <code><em>model-name</em>.json</code>; for example <code>customer.json</code>.</li>
          <li>Custom model scripts by convention named <code><em>model-name</em>.js</code>; for example, <code>customer.js</code>.</li>
        </ul>
      For more information, see <a href="Model-definition-JSON-file.html">Model definition JSON file</a> and <a href="Customizing-models.html">Customizing models</a>. See note below.
      </td>
      <td>
        Node:<br><code>myModel = <br/>app.models.myModelName</code>
      </td>
    </tr>
  </tbody>
</table>

{% include important.html content="
The LoopBack [model generator](Model-generator.html)
automatically converts camel-case model names (for example MyModel) to lowercase dashed names (my-model).
For example, if you create a model named \"FooBar\" with the model generator, it creates files `foo-bar.json` and `foo-bar.js` in `common/models`.
However, the model name (\"FooBar\") will be preserved via the model's name property.
" %}
