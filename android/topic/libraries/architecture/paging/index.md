---
layout: android
---
* content
{:toc}

# Paging库概述&nbsp;&nbsp;[Android Jetpack]({{ sites.base_url }}/android/jetpack)中的库

The Paging Library makes it easier for you to load data gradually and gracefully within your app's [RecyclerView]().

Many apps consume data from a data source that contains a large number of items, but only display a small portion at a time.

The Paging Library helps your app observe and display a reasonable subset of this data. This functionality has several advantages:

* Data requests consume less network bandwidth and fewer system resources. Users who have metered or small data plans appreciate such data-conscious apps.
* Even during data updates and refreshes, the app continues to respond quickly to user input.

If your app already includes logic for paging data and displaying lists, we've provided guidance on how to <a href="#update-your-existing-app">Update your existing app</a>.

> **Note: To import the Paging library into your Android project, see Adding [Components to your Project]().**

This guide provides an overview of how you can use the Paging Library to request and display data that users want to see while consuming system resources more economically. For guides specific to the layers of your app's architecture, see the following related pages:

* [UI components and considerations]()
* [Data components and considerations]()

> **Note: The Paging Library helps you display data in your UI's list containers smoothly, regardless of whether you use only a device-internal database or you fetch information from your app's backend. To learn more about how best to use the library based on where your app's data is located, see <a href="#支持不同的数据架构">支持不同的数据架构</a>.**

## Library architecture

Paging库的关键组件是[PagedList]()类, which is a collection that loads chunks of your app's data, or pages, asynchronously(负责使用异步方式加载分页数据). This class serves as a mediator between other pieces of your app's architecture(这个类实际是UI和Data模块之间的桥梁):

* Data
Each instance of [PagedList]() loads an up-to-date snapshot of your app's data from its [DataSource](). Data flows from your app's backend or database into the PagedList object.
The Paging Library supports a [variety of app architectures](), including a standalone database and a database that communicates with a backend server.
To learn more, see [Data components and considerations]().

* UI
The [PagedList]() class works with a PagedListAdapter to load items into a [RecyclerView](). These classes work together to fetch and display content as it's loaded, prefetching out-of-view content and animating content changes.
To learn more, see [UI components and considerations]().

Paging库实现了观察者模式 that's recommended in the [guide to app architecture](). In particular, the core components of the library create an instance of [LiveData\<PagedList>]() (or the equivalent RxJava2-based classes) that the UI can observe. Your app's UI can then present content from [PagedList]() objects as they're generated, all while respecting your UI controllers' [lifecycles]().

## 支持不同的数据架构

The Paging Library supports app architectures, including ones where your app is fetching data only from a backend server, only from an on-device database, or from a combination of the two sources. This section provides recommendations for each of these cases.

We've provided examples of the recommend patterns to use for different data architectures. To view them, see the [PagingWithNetwork sample](https://github.com/googlesamples/android-architecture-components/tree/master/PagingWithNetworkSample) on GitHub.

### 只使用网络

显示从后台服务器获取的数据, use the synchronous version of the [Retrofit API]() to load information into [your own custom DataSource object]().

> **Note: Paging库的DataSource对象不提供任何容错处理, 因为不同的app处理错误和呈现错误UI方式不同. If an error occurs, defer to your result callback, and retry the request later. See the [PagingWithNetwork sample](https://github.com/googlesamples/android-architecture-components/tree/master/PagingWithNetworkSample) for an example of this behavior.**

### 只是用数据库

Set up your [RecyclerView]() to observe local storage, preferably using the [Room persistence library](). That way, whenever data is inserted or modified in your app's database, these changes are automatically reflected in the RecyclerView that's displaying this data.

### 网络和数据库

After you've started observing the database, you can listen for when the database is out of data by using [PagedList.BoundaryCallback](). You can then fetch more items from your network and insert them into the database. If your UI is observing the database, that's all you need to do.

The following code snippet shows an example usage of a boundary callback:

**KOTLIN:**
```java
class ConcertViewModel {
    fun search(query: String): ConcertSearchResult {
        val boundaryCallback =
                ConcertBoundaryCallback(query, myService, myCache)
        // Use a LiveData object to communicate your network's state back
        // to your app's UI, as in the following example. Note that error
        // handling isn't shown in this snippet.
        // val loadingState: LiveData<MyNetworkState> =
        //        boundaryCallback.loadingState
    }
}

class ConcertBoundaryCallback(
        private val query: String,
        private val service: MyService,
        private val cache: MyLocalCache
) : PagedList.BoundaryCallback<Concert>() {
    // Requests initial data from the network, replacing all content currently
    // in the database.
    override fun onZeroItemsLoaded() {
        requestAndReplaceInitialData(query)
    }

    // Requests additional data from the network, appending the results to the
    // end of the database's existing data.
    override fun onItemAtEndLoaded(itemAtEnd: Concert) {
        requestAndAppendData(query, itemAtEnd.key)
    }
}
```
**JAVA:**
```java
public class ConcertViewModel {
    public ConcertSearchResult search(String query) {
        ConcertBoundaryCallback boundaryCallback =
                new ConcertBoundaryCallback(query, myService, myCache);
        // Use a LiveData object to communicate your network's state back
        // to your app's UI, as in the following example. Note that error
        // handling isn't shown in this snippet.
        // LiveData<NetworkState> loadingState =
        //      boundaryCallback.getLoadingState();
    }
}

public class ConcertBoundaryCallback
        extends PagedList.BoundaryCallback<Concert> {
    private String mQuery;
    private MyService mService;
    private MyLocalCache mCache;

    public ConcertBoundaryCallback(String query, MyService service,
            MyLocalCache cache) {
        mQuery = query;
        // ...
    }

    // Requests initial data from the network, replacing all content currently
    // in the database.
    @Override
    public void onZeroItemsLoaded() {
        requestAndReplaceInitialData(mQuery);
    }

    // Requests additional data from the network, appending the results to the
    // end of the database's existing data.
    @Override
    public void onItemAtEndLoaded(@NonNull Concert itemAtEnd) {
        requestAndAppendData(mQuery, itemAtEnd.key);
    }
}
```
To see a more extended example of how a Paging Library solution can fetch data from both a network and a database, navigate to the [Paging codelab]() or the [PagingWithNetwork sample](https://github.com/googlesamples/android-architecture-components/tree/master/PagingWithNetworkSample) on GitHub.

## 处理网络错误

When using a network to fetch or page the data that you're displaying using the Paging Library, it's important to not treat the network as being either "available" or "unavailable" all the time, as many connections are intermittent or flaky:

* A particular server might fail to respond to a network request.
* The device might be connected to a network that's slow or weak.

Instead, your app should check each request for failures and recover as gracefully as possible in cases where the network isn't available. For example, you can provide a "retry" button for users to select if the data refresh step doesn't work. If an error occurs during the data paging step, it's best to retry the paging requests automatically.

## Update your existing app

If your app already consumes data from a database or a backend source, it's possible to upgrade directly to functionality that the Paging Library provides. This section shows how to upgrade an app that has a common existing design.

### Custom paging solutions

If you use custom functionality to load small subsets of data from your app's data source, you can replace this logic with that from the [PagedList]() class. Instances of PagedList offer built-in connections to common data sources. These instances also provide adapters for [RecyclerView]() objects that you might include in your app's UI.

### Data loaded using lists instead of pages

If you use an in-memory list as the backing data structure for your UI's adapter, consider observing data updates using a [PagedList]() class if the number of items in the list can become large. Instances of PagedList can use either [LiveData\<PagedList>]() or Observable\<List> to pass data updates to your app's UI, minimizing load times and memory usage. Better still, replacing a [List]() object with a PagedList object in your app doesn't require any changes to your app's UI structure or data updating logic.

### Associate a data cursor with a list view using CursorAdapter

Your app might use a [CursorAdapter]() to associate data from a [Cursor]() with a [ListView](). In that case, you usually need to migrate from a ListView to a RecyclerView as your app's list UI container, then replace the Cursor component with either [Room]() or PositionalDataSource, depending on whether instances of Cursor access a SQLite database.

In some situations, such as when working with instances of [Spinner](), you provide only the adapter itself. A library then takes the data that's loaded into that adapter and displays the data for you. In these situations, change the type of your adapter's data to [LiveData\<PagedList>](), then wrap this list in an [ArrayAdapter]() object before attempting to have a library class inflate these items in a UI.

### Load content asynchronously using AsyncListUtil

If you're using [AsyncListUtil]() objects to load and display groups of information asynchronously, the Paging Library lets you load data more easily:

* **Your data doesn't need to be positional.** The Paging Library lets you load data directly from your backend using keys that the network provides.
* **Your data can be uncountably large.** Using the Paging Library, you can load data into pages until there isn't any data remaining.
* **You can observe your data more easily.** The Paging library can present your data that your app's ViewModel holds in an observable data structure.

> **Note: If your existing app accesses a SQLite database, see the section on [using the Room persistence library]().**

## Database examples

The following code snippets show several possible ways of having all the pieces work together.

### Observing paged data using LiveData

The following code snippet shows all the pieces working together. As concert events are added, removed, or changed in the database, the content in the [RecyclerView]() is automatically and efficiently updated:

**KOTLIN**
```java
@Dao
interface ConcertDao {
    // The Int type parameter tells Room to use a PositionalDataSource
    // object, with position-based loading under the hood.
    @Query("SELECT * FROM concerts ORDER BY date DESC")
    fun concertsByDate(): DataSource.Factory<Int, Concert>
}

class ConcertViewModel(concertDao: ConcertDao) : ViewModel() {
    val concertList: LiveData<PagedList<Concert>> =
            LivePagedListBuilder(
                    concertDao.concertsByDate(), /* page size */ 20).build()
}

class ConcertActivity : AppCompatActivity() {
    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val viewModel = ViewModelProviders.of(this)
                .get(ConcertViewModel::class.java!!)
        val recyclerView = findViewById(R.id.concert_list)
        val adapter = ConcertAdapter()
        viewModel.concertList.observe(this, { pagedList ->
                adapter.submitList(pagedList) })
        recyclerView.setAdapter(adapter)
    }
}

class ConcertAdapter() :
        PagedListAdapter<Concert, ConcertViewHolder>(DIFF_CALLBACK) {
    fun onBindViewHolder(holder: ConcertViewHolder, position: Int) {
        val concert = getItem(position)
        if (concert != null) {
            holder.bindTo(concert)
        } else {
            // Null defines a placeholder item - PagedListAdapter automatically
            // invalidates this row when the actual object is loaded from the
            // database.
            holder.clear()
        }
    }

    companion object {
        private val DIFF_CALLBACK = object :
                DiffUtil.ItemCallback<Concert>() {
            // Concert details may have changed if reloaded from the database,
            // but ID is fixed.
            override fun areItemsTheSame(oldConcert: Concert,
                    newConcert: Concert): Boolean =
                    oldConcert.id == newConcert.id

            override fun areContentsTheSame(oldConcert: Concert,
                    newConcert: Concert): Boolean =
                    oldConcert == newConcert
        }
    }
}
```
**JAVA**kotlin
```java
@Dao
public interface ConcertDao {
    // The Integer type parameter tells Room to use a PositionalDataSource
    // object, with position-based loading under the hood.
    @Query("SELECT * FROM concerts ORDER BY date DESC")
    DataSource.Factory<Integer, Concert> concertsByDate();
}

public class ConcertViewModel extends ViewModel {
    private ConcertDao mConcertDao;
    public final LiveData<PagedList<Concert>> concertList;

    public ConcertViewModel(ConcertDao concertDao) {
        mConcertDao = concertDao;
        concertList = new LivePagedListBuilder<>(
            mConcertDao.concertsByDate(), /* page size */ 20).build();
    }
}

public class ConcertActivity extends AppCompatActivity {
    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ConcertViewModel viewModel =
                ViewModelProviders.of(this).get(ConcertViewModel.class);
        RecyclerView recyclerView = findViewById(R.id.concert_list);
        ConcertAdapter adapter = new ConcertAdapter();
        viewModel.concertList.observe(this, adapter::submitList);
        recyclerView.setAdapter(adapter);
    }
}

public class ConcertAdapter
        extends PagedListAdapter<Concert, ConcertViewHolder> {
    protected ConcertAdapter() {
        super(DIFF_CALLBACK);
    }

    @Override
    public void onBindViewHolder(@NonNull ConcertViewHolder holder,
            int position) {
        Concert concert = getItem(position);
        if (concert != null) {
            holder.bindTo(concert);
        } else {
            // Null defines a placeholder item - PagedListAdapter automatically
            // invalidates this row when the actual object is loaded from the
            // database.
            holder.clear();
        }
    }

    private static DiffUtil.ItemCallback<Concert> DIFF_CALLBACK =
            new DiffUtil.ItemCallback<Concert>() {
        // Concert details may have changed if reloaded from the database,
        // but ID is fixed.
        @Override
        public boolean areItemsTheSame(Concert oldConcert, Concert newConcert) {
            return oldConcert.getId() == newConcert.getId();
        }

        @Override
        public boolean areContentsTheSame(Concert oldConcert,
                Concert newConcert) {
            return oldConcert.equals(newConcert);
        }
    };
}
```

### Observing paged data using RxJava2

If you prefer using [RxJava2]() instead of [LiveData](), you can instead create an Observable or Flowable object:

**KOTLIN**
```java
class ConcertViewModel(concertDao: ConcertDao) : ViewModel() {
    val concertList: Flowable<PagedList<Concert>> =
            RxPagedListBuilder(concertDao.concertsByDate(), /* page size */ 50)
                    .buildFlowable(BackpressureStrategy.LATEST)
}
```
**JAVA**
```java
public class ConcertViewModel extends ViewModel {
    private ConcertDao mConcertDao;
    public final Flowable<PagedList<Concert>> concertList;

    public ConcertViewModel(ConcertDao concertDao) {
        mConcertDao = concertDao;

        concertList = new RxPagedListBuilder<>(
                mConcertDao.concertsByDate(), /* page size */ 50)
                        .buildFlowable(BackpressureStrategy.LATEST);
    }
}
```
You can then start and stop observing the data using the code in the following snippet:
**KOTLIN**
```java
class ConcertActivity : AppCompatActivity() {
    private lateinit var adapter: ConcertAdapter
    private lateinit var viewModel: ConcertViewModel

    private val disposable = CompositeDisposable()

    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val recyclerView = findViewById(R.id.concert_list)
        viewModel = ViewModelProviders.of(this)
                .get(ConcertViewModel::class.java!!)
        adapter = ConcertAdapter()
        recyclerView.setAdapter(adapter)
    }

    override fun onStart() {
        super.onStart()
        disposable.add(viewModel.concertList.subscribe({
                flowableList -> adapter.submitList(flowableList)
        }))
    }

    override fun onStop() {
        super.onStop()
        disposable.clear()
    }
}
```
**JAVA**
```java
public class ConcertActivity extends AppCompatActivity {
    private ConcertAdapter mAdapter;
    private ConcertViewModel mViewModel;

    private CompositeDisposable mDisposable = new CompositeDisposable();

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        RecyclerView recyclerView = findViewById(R.id.concert_list);

        mViewModel = ViewModelProviders.of(this).get(ConcertViewModel.class);
        mAdapter = new ConcertAdapter();
        recyclerView.setAdapter(mAdapter);
    }

    @Override
    protected void onStart() {
        super.onStart();
        mDisposable.add(mViewModel.concertList.subscribe(
                flowableList -> mAdapter.submitList(flowableList)
        ));
    }

    @Override
    protected void onStop() {
        super.onStop();
        mDisposable.clear();
    }
}
```
The code for the ConcertDao and ConcertAdapter are the same for an [RxJava2]()-based solution as they are for a [LiveData]()-based solution.

## Provide feedback

## Additional resources
