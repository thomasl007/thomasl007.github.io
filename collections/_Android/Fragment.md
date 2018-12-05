---
---
## Fragment生命周期相关

* add => `onAttach ->...-> onResume`
    * attach => `onCreateView ->...-> onResume`
        * show => 不影响生命周期
        * hide => 不影响生命周期
    * detach => `onPause ->...-> onDestroyView` **NOTE：detach之后，isAdded() 函数会返回 false**
* remove => `onPause ->...-> onDestroy`

* replace => `onAttach ->...-> onResume`
