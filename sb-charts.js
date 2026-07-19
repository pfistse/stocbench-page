/* StocBench interactive paper-style charts. Data extracted from the paper's PGF figures.
   <sb-chart panel="mean|std|energy|enstrophy|det_mean|det_std|rollout|ratio"> and <sb-legend>. */
(function () {
  if (customElements.get('sb-chart')) return;

  var METHODS = [
    { id: 'SI',     color: '#1f77b4' },
    { id: 'DPM-2',  color: '#d6c62f' },
    { id: 'DDIM',   color: '#d62728' },
    { id: 'DDPM',   color: '#2ca02c' },
    { id: 'FM',     color: '#ff7f0e' },
    { id: 'ADD-FM', color: '#9c51c4', few: true, dash: '2 3' },
    { id: 'CD-1',   color: '#7f7f7f', few: true, dash: '2 3' },
    { id: 'CD-2',   color: '#7f7f7f', few: true, dash: '7 3' }
  ];

  var PANELS = {"mean":{"ylabel":"Mean relative L2 error","ymin":0,"ymax":0.105,"yticks":[0,0.02,0.04,0.06,0.08,0.1],"xmax":408,"xticks":[0,100,200,300,400],"xlabel":"Inference steps","fmt":3,"series":{"SI":[[27.35,0.1021],[30,0.09345],[40,0.07552],[50,0.06507],[60,0.0587],[70,0.05411],[80,0.05099],[90,0.04884],[100,0.04624],[200,0.03947],[300,0.03798],[400,0.03768]],"DPM-2":[[10,0.05091],[20,0.0513],[30,0.05065],[40,0.05105],[50,0.05096],[60,0.05092],[70,0.0509],[80,0.0509],[90,0.05083],[100,0.05093],[200,0.05065],[300,0.05065],[400,0.05093]],"DDIM":[[10,0.04909],[20,0.04957],[30,0.05003],[40,0.05042],[50,0.05006],[60,0.04965],[70,0.04952],[80,0.04978],[90,0.05003],[100,0.05],[200,0.05047],[300,0.05052],[400,0.05068]],"DDPM":[[10,0.04327],[20,0.04263],[30,0.04315],[40,0.04349],[50,0.04394],[60,0.04459],[70,0.04476],[80,0.04528],[90,0.0453],[100,0.04514],[200,0.04575],[300,0.04673],[400,0.04636]],"FM":[[10,0.03954],[20,0.03591],[30,0.03562],[40,0.03561],[50,0.03569],[60,0.03581],[70,0.03587],[80,0.03597],[90,0.03604],[100,0.03605],[200,0.03617],[300,0.03627],[400,0.03645]]},"flats":{"ADD-FM":0.03956,"CD-1":0.06766,"CD-2":0.06225}},"std":{"ylabel":"Std relative L2 error","ymin":0,"ymax":0.105,"yticks":[0,0.02,0.04,0.06,0.08,0.1],"xmax":408,"xticks":[0,100,200,300,400],"xlabel":"Inference steps","fmt":3,"series":{"SI":[[60.12,0.1021],[70,0.09133],[80,0.08375],[90,0.0756],[100,0.07032],[200,0.04631],[300,0.0375],[400,0.03524]],"DPM-2":[[10,0.02544],[20,0.02776],[30,0.02941],[40,0.03104],[50,0.03126],[60,0.03124],[70,0.03149],[80,0.0316],[90,0.03127],[100,0.03169],[200,0.03228],[300,0.03225],[400,0.03166]],"DDIM":[[20.79,0.1021],[30,0.07888],[40,0.0664],[50,0.05913],[60,0.05334],[70,0.05026],[80,0.04807],[90,0.04591],[100,0.04354],[200,0.03887],[300,0.03655],[400,0.03336]],"DDPM":[[36.01,0.1021],[40,0.09331],[50,0.07992],[60,0.07139],[70,0.06512],[80,0.05946],[90,0.0557],[100,0.05343],[200,0.03887],[300,0.03679],[400,0.03442]],"FM":[[37.07,0.1021],[40,0.09353],[50,0.07528],[60,0.06405],[70,0.05496],[80,0.04985],[90,0.04518],[100,0.04105],[200,0.0275],[300,0.02417],[400,0.02327]]},"flats":{"ADD-FM":0.02535,"CD-1":0.03216,"CD-2":0.03347}},"energy":{"ylabel":"Energy distance","ymin":0,"ymax":0.105,"yticks":[0,0.02,0.04,0.06,0.08,0.1],"xmax":408,"xticks":[0,100,200,300,400],"xlabel":"Inference steps","fmt":3,"series":{"SI":[[31.61,0.1021],[40,0.08465],[50,0.07207],[60,0.06421],[70,0.0583],[80,0.05419],[90,0.05088],[100,0.04802],[200,0.03785],[300,0.03537],[400,0.03472]],"DPM-2":[[10,0.04246],[20,0.04336],[30,0.04311],[40,0.04363],[50,0.0436],[60,0.04356],[70,0.04359],[80,0.04361],[90,0.04351],[100,0.04364],[200,0.04348],[300,0.04348],[400,0.04364]],"DDIM":[[10,0.08132],[20,0.05906],[30,0.0526],[40,0.04992],[50,0.04797],[60,0.04645],[70,0.04573],[80,0.0456],[90,0.04532],[100,0.04492],[200,0.04436],[300,0.04403],[400,0.04381]],"DDPM":[[12.07,0.1021],[20,0.0712],[30,0.05816],[40,0.05187],[50,0.0484],[60,0.04665],[70,0.04531],[80,0.04435],[90,0.0436],[100,0.04296],[200,0.04081],[300,0.04106],[400,0.04039]],"FM":[[15.74,0.1021],[20,0.07558],[30,0.05665],[40,0.04755],[50,0.04243],[60,0.0396],[70,0.03747],[80,0.03641],[90,0.03549],[100,0.0347],[200,0.0325],[300,0.03212],[400,0.03219]]},"flats":{"ADD-FM":0.0339,"CD-1":0.05462,"CD-2":0.0515}},"enstrophy":{"ylabel":"Enstrophy spectrum error","ymin":0,"ymax":41,"yticks":[0,5,10,15,20,25,30,35,40],"xmax":408,"xticks":[0,100,200,300,400],"xlabel":"Inference steps","fmt":1,"series":{"SI":[[17.79,40.85],[20,37.67],[30,29.56],[40,24.89],[50,20.9],[60,18.5],[70,16.23],[80,15.16],[90,14.1],[100,12.66],[200,6.449],[300,5.093],[400,5.353]],"DPM-2":[[10,6.306],[20,8.856],[30,8.997],[40,9.327],[50,9.336],[60,9.334],[70,9.371],[80,9.388],[90,9.313],[100,9.403],[200,10.22],[300,10.21],[400,9.397]],"DDIM":[[10,22.45],[20,16.53],[30,14.22],[40,12.98],[50,12.41],[60,11.93],[70,11.51],[80,11.31],[90,11.25],[100,10.96],[200,10.98],[300,10.72],[400,9.452]],"DDPM":[[10,26.79],[20,17.89],[30,14.07],[40,11.85],[50,10.75],[60,9.59],[70,8.8],[80,8.346],[90,7.933],[100,7.354],[200,5.375],[300,4.729],[400,5.179]],"FM":[[10,31],[20,17.63],[30,12.3],[40,9.394],[50,7.494],[60,6.244],[70,5.268],[80,4.64],[90,4.073],[100,3.619],[200,2.895],[300,2.459],[400,1.317]]},"flats":{"ADD-FM":2.284,"CD-1":6.48,"CD-2":2.189}},"det_mean":{"ylabel":"Mean relative L2 error","ymin":0,"ymax":0.125,"yticks":[0,0.02,0.04,0.06,0.08,0.1,0.12],"xmax":408,"xticks":[0,100,200,300,400],"xlabel":"Inference steps","fmt":3,"series":{"SI":[[10,0.04909],[20,0.03069],[30,0.02676],[40,0.02546],[50,0.0249],[60,0.02458],[70,0.02441],[80,0.0243],[90,0.02422],[100,0.02418],[200,0.02405],[300,0.02403],[400,0.02403]],"DPM-2":[[10,0.02489],[20,0.02445],[30,0.02433],[40,0.02431],[50,0.0243],[60,0.02426],[70,0.02428],[80,0.02426],[90,0.02423],[100,0.02423],[200,0.02423],[300,0.02424],[400,0.02423]],"DDIM":[[10,0.06092],[20,0.05972],[30,0.05946],[40,0.05934],[50,0.05929],[60,0.05928],[70,0.05924],[80,0.0592],[90,0.05918],[100,0.05918],[200,0.05914],[300,0.05914],[400,0.05915]],"DDPM":[[10,0.05847],[20,0.05777],[30,0.05767],[40,0.0576],[50,0.05757],[60,0.0576],[70,0.05759],[80,0.05754],[90,0.05755],[100,0.05754],[200,0.0575],[300,0.05749],[400,0.0575]],"FM":[[10,0.02463],[20,0.02451],[30,0.0245],[40,0.02449],[50,0.0245],[60,0.02448],[70,0.02449],[80,0.02449],[90,0.02449],[100,0.02448],[200,0.02448],[300,0.02447],[400,0.02447]]},"flats":{"CD-1":0.1133,"CD-2":0.05191,"ADD-FM":0.03573}},"det_std":{"ylabel":"Std relative L2 error","ymin":0,"ymax":10,"yticks":[0,2,4,6,8,10],"xmax":408,"xticks":[0,100,200,300,400],"xlabel":"Inference steps","fmt":2,"series":{"SI":[[10,2.911],[20,1.781],[30,1.631],[40,1.61],[50,1.612],[60,1.626],[70,1.634],[80,1.646],[90,1.656],[100,1.662],[200,1.704],[300,1.723],[400,1.73]],"DPM-2":[[10,1.05],[20,1.044],[30,1.083],[40,1.135],[50,1.174],[60,1.219],[70,1.253],[80,1.283],[90,1.315],[100,1.341],[200,1.503],[300,1.577],[400,1.622]],"DDIM":[[10,2.549],[20,2.115],[30,2.035],[40,2.024],[50,2.026],[60,2.047],[70,2.061],[80,2.086],[90,2.104],[100,2.123],[200,2.277],[300,2.354],[400,2.406]],"DDPM":[[10,1.192],[20,1.097],[30,1.12],[40,1.152],[50,1.186],[60,1.22],[70,1.247],[80,1.273],[90,1.301],[100,1.322],[200,1.477],[300,1.553],[400,1.606]],"FM":[[10,0.9167],[20,1.115],[30,1.248],[40,1.337],[50,1.398],[60,1.446],[70,1.479],[80,1.509],[90,1.531],[100,1.547],[200,1.635],[300,1.667],[400,1.684]]},"flats":{"CD-1":9.195,"CD-2":1.981,"ADD-FM":1.868}},"rollout":{"ylabel":"Enstrophy spectrum error","ymin":0,"ymax":18,"yticks":[0,2.5,5,7.5,10,12.5,15,17.5],"xmax":50,"xticks":[0,10,20,30,40,50],"xlabel":"Rollout step","fmt":1,"series":{"SI":[[1,4.413],[2,6.962],[3,9.161],[4,10.37],[5,12.53],[6,13.69],[7,14.74],[8,15.32],[9,15.94],[10,16.79],[11,16.89],[12,17.29],[13,17.4],[14,17.29],[15,17.25],[16,17.23],[17,16.9],[18,17.68],[20,17.99],[21,17.64],[22,17.65]],"FM":[[1,1.475],[2,2.557],[3,3.117],[4,3.347],[5,3.488],[6,4.091],[7,5.098],[8,5.251],[9,5.433],[10,4.962],[11,4.927],[12,5.161],[13,5.366],[14,4.522],[15,4.188],[16,4.008],[17,4.646],[18,4.475],[19,4.348],[20,3.873],[21,4.469],[22,4.166],[23,4.039],[24,3.968],[25,4.043],[26,4.443],[27,4.032],[28,4.028],[29,4.476],[30,5.153],[31,4.966],[32,4.952],[33,5.678],[34,5.298],[35,5.392],[36,4.505],[37,4.83],[38,4.367],[39,4.64],[40,4.479],[41,5.057],[42,5.9],[43,5.884],[44,5.952],[45,5.094],[46,4.947],[47,5.043],[48,4.505],[49,5.162],[50,4.611]],"DPM-2":[[1,3.494],[2,6.055],[3,7.604],[4,8.607],[5,9.523],[6,10.73],[7,12],[8,12.4],[9,12.74],[10,12.49],[11,12.6],[12,12.91],[13,13.22],[14,12.59],[15,12.21],[16,12.15],[17,13.15],[18,13.07],[19,13.11],[20,12.57],[21,13.32],[22,12.94],[23,12.74],[24,12.8],[25,13.02],[26,13.08],[27,12.51],[28,12.28],[29,12.91],[30,13.78],[31,13.81],[32,13.56],[33,14.34],[34,13.84],[35,14.13],[36,13.31],[37,13.67],[38,13.07],[39,13.46],[40,13.58],[41,14],[42,14.75],[43,14.89],[44,14.65],[45,13.65],[46,13.55],[47,13.88],[48,13.27],[49,14.38],[50,13.63]],"DDIM":[[1,4.037],[2,6.982],[3,8.837],[4,10.07],[5,11.17],[6,12.5],[7,13.84],[8,14.33],[9,14.72],[10,14.54],[11,14.7],[12,15.04],[13,15.38],[14,14.77],[15,14.39],[16,14.27],[17,15.35],[18,15.31],[19,15.2],[20,14.64],[21,15.39],[22,15.04],[23,14.97],[24,15.06],[25,15.36],[26,15.28],[27,14.81],[28,14.85],[29,15.57],[30,16.29],[31,16.08],[32,15.96],[33,16.68],[34,16.28],[35,16.41],[36,15.41],[37,15.84],[38,15.33],[39,15.81],[40,15.69],[41,16.16],[42,16.77],[43,16.86],[44,16.82],[45,15.93],[46,15.8],[47,16.02],[48,15.52],[49,16.38],[50,15.55]],"DDPM":[[1,2.136],[2,3.81],[3,4.853],[4,6.033],[5,7.091],[6,7.531],[7,8.56],[8,8.901],[9,8.715],[10,9.361],[11,9.471],[12,10.01],[13,9.886],[14,9.958],[15,10.09],[16,10.25],[17,9.652],[18,9.66],[19,9.757],[20,9.813],[21,10.51],[22,10.3],[23,10.49],[24,10.77],[25,11.06],[26,11.48],[27,11.69],[28,11.7],[29,11.96],[30,11.82],[31,11.47],[32,10.59],[33,10.6],[34,10.86],[35,10.99],[36,11.6],[37,10.72],[38,11.02],[39,10.46],[40,9.718],[41,9.358],[42,9.667],[43,9.717],[44,10.09],[45,9.919],[46,9.812],[47,10.24],[48,9.837],[49,9.655],[50,9.104]],"ADD-FM":[[1,0.5898],[2,0.722],[3,0.8326],[4,1.328],[5,1.376],[6,1.13],[7,1.424],[8,1.062],[9,0.7243],[10,0.9324],[11,1.109],[12,1.048],[13,1.388],[14,1.533],[15,2.299],[16,2.523],[17,1.901],[18,1.87],[19,1.877],[20,2.49],[21,2.181],[22,2.765],[23,2.329],[24,2.416],[25,1.998],[26,1.859],[27,2.027],[28,2.504],[29,2.097],[30,1.943],[31,1.3],[32,1.458],[33,1.712],[34,1.53],[35,1.255],[36,1.616],[37,1.44],[38,1.708],[39,1.803],[40,1.65],[41,1.464],[42,1.71],[43,1.456],[44,1.502],[45,1.46],[46,1.671],[47,2.079],[48,1.808],[49,1.629],[50,1.735]],"CD-1":[[1,2.721],[2,4.379],[3,5.196],[4,5.71],[5,6.082],[6,6.982],[7,7.753],[8,7.942],[9,8.289],[10,7.936],[11,7.923],[12,8.225],[13,8.334],[14,7.707],[15,7.466],[16,7.567],[17,8.112],[18,7.891],[19,8.13],[20,7.57],[21,8.025],[22,7.759],[23,7.556],[24,7.547],[25,7.711],[26,7.668],[27,6.96],[28,7.29],[29,8.112],[30,8.74],[31,8.543],[32,8.222],[33,8.749],[34,8.568],[35,8.507],[36,7.964],[37,8.275],[38,7.669],[39,8.029],[40,7.784],[41,8.374],[42,8.955],[43,9.191],[44,9.265],[45,8.747],[46,8.298],[47,8.439],[48,8.248],[49,8.801],[50,8.195]],"CD-2":[[1,1.275],[2,1.678],[3,1.769],[4,1.937],[5,1.964],[6,2.042],[7,2.506],[8,2.222],[9,2.732],[10,2.76],[11,2.304],[12,2.213],[13,2.259],[14,3.155],[15,2.905],[16,2.232],[17,2.834],[18,2.312],[19,2.836],[20,3.073],[21,2.968],[22,3.143],[23,2.887],[24,3.179],[25,3.347],[26,3.383],[27,3.504],[28,3.531],[29,2.93],[30,2.69],[31,2.78],[32,3.879],[33,3.728],[34,3.777],[35,3.13],[36,3.312],[37,2.992],[38,2.441],[39,2.344],[40,3.065],[41,2.965],[42,3.2],[43,3.026],[44,2.988],[45,3.31],[46,2.961],[47,3.089],[48,3.756],[49,3.656],[50,3.703]]},"flats":{}},"ratio":{"ylabel":"Enstrophy ratio","ymin":0.65,"ymax":1.2,"yticks":[0.7,0.8,0.9,1,1.1],"xlog":true,"xmin":1,"xmax":40,"xticks":[1,2,5,10,20,40],"xlabel":"Wavenumber k","fmt":3,"refline":1,"series":{"SI":[[1,0.9017],[2,0.8565],[3,0.8351],[4,0.8012],[5,0.797],[6,0.8449],[7,0.8639],[8,0.8177],[9,0.8115],[10,0.815],[11,0.8764],[12,0.8114],[13,0.809],[14,0.7999],[15,0.794],[16,0.7907],[17,0.7894],[18,0.7819],[19,0.7784],[20,0.7768],[21,0.7707],[22,0.7687],[23,0.7658],[24,0.7576],[25,0.7561],[26,0.7509],[27,0.745],[28,0.7438],[29,0.7369],[30,0.7347],[31,0.7304],[32,0.7264],[33,0.7224],[34,0.7216],[35,0.7119],[36,0.7122],[37,0.7117],[38,0.7038],[39,0.6998],[40,0.692]],"DPM-2":[[1,0.9331],[2,0.9099],[3,0.8694],[4,0.8568],[5,0.849],[6,0.862],[7,0.9032],[8,0.8556],[9,0.86],[10,0.8653],[11,0.9467],[12,0.8719],[13,0.8701],[14,0.8673],[15,0.8594],[16,0.8583],[17,0.8557],[18,0.8529],[19,0.8469],[20,0.8467],[21,0.8396],[22,0.8409],[23,0.8324],[24,0.8302],[25,0.8242],[26,0.8162],[27,0.8128],[28,0.8107],[29,0.8029],[30,0.7993],[31,0.7975],[32,0.7974],[33,0.7921],[34,0.7813],[35,0.7784],[36,0.7728],[37,0.771],[38,0.7633],[39,0.7674],[40,0.7635]],"DDIM":[[1,0.9155],[2,0.9014],[3,0.8632],[4,0.8315],[5,0.816],[6,0.8322],[7,0.8747],[8,0.8313],[9,0.8377],[10,0.8452],[11,0.9258],[12,0.8464],[13,0.8477],[14,0.8429],[15,0.8378],[16,0.8396],[17,0.8279],[18,0.8298],[19,0.8182],[20,0.8167],[21,0.8142],[22,0.8103],[23,0.803],[24,0.7969],[25,0.7949],[26,0.7891],[27,0.7822],[28,0.779],[29,0.775],[30,0.7689],[31,0.7631],[32,0.7621],[33,0.7581],[34,0.7516],[35,0.7504],[36,0.7398],[37,0.7384],[38,0.729],[39,0.7207],[40,0.7184]],"DDPM":[[1,0.9785],[2,0.9398],[3,0.9238],[4,0.8992],[5,0.8931],[6,0.8986],[7,0.9162],[8,0.8943],[9,0.8973],[10,0.8986],[11,0.9307],[12,0.9019],[13,0.9012],[14,0.8976],[15,0.8939],[16,0.8984],[17,0.8924],[18,0.891],[19,0.8879],[20,0.8862],[21,0.8841],[22,0.8792],[23,0.8735],[24,0.8728],[25,0.8643],[26,0.8659],[27,0.8581],[28,0.8553],[29,0.8535],[30,0.851],[31,0.8497],[32,0.8416],[33,0.8389],[34,0.834],[35,0.8304],[36,0.8268],[37,0.8198],[38,0.8181],[39,0.8191],[40,0.8155]],"FM":[[1,0.9903],[2,0.9805],[3,0.9645],[4,0.9662],[5,0.9637],[6,0.947],[7,0.9652],[8,0.961],[9,0.9602],[10,0.9629],[11,0.9698],[12,0.959],[13,0.9599],[14,0.9618],[15,0.9574],[16,0.9618],[17,0.961],[18,0.9573],[19,0.9575],[20,0.9564],[21,0.9547],[22,0.9546],[23,0.9517],[24,0.9492],[25,0.9449],[26,0.9462],[27,0.944],[28,0.9422],[29,0.9364],[30,0.9397],[31,0.9337],[32,0.9362],[33,0.9278],[34,0.931],[35,0.9283],[36,0.9322],[37,0.9271],[38,0.923],[39,0.9205],[40,0.9257]],"ADD-FM":[[1,1.015],[2,1.016],[3,1.002],[4,1.009],[5,0.9899],[6,0.9855],[7,0.9814],[8,1.01],[9,1.022],[10,1.027],[11,1.036],[12,1.037],[13,1.042],[14,1.041],[15,1.038],[16,1.035],[17,1.034],[18,1.031],[19,1.028],[20,1.033],[21,1.031],[22,1.026],[23,1.025],[24,1.02],[25,1.015],[26,1.012],[27,1.009],[28,1.004],[29,0.9996],[30,0.9969],[31,0.9905],[32,0.9897],[33,0.9844],[34,0.984],[35,0.9749],[36,0.9745],[37,0.97],[38,0.9572],[39,0.9477],[40,0.9403]],"CD-1":[[1,1.118],[2,1.012],[3,0.9727],[4,0.9308],[5,0.9083],[6,0.9116],[7,0.9018],[8,0.9047],[9,0.9184],[10,0.9285],[11,0.9936],[12,0.9277],[13,0.9326],[14,0.9267],[15,0.9225],[16,0.9209],[17,0.9149],[18,0.9114],[19,0.9046],[20,0.8973],[21,0.8988],[22,0.8904],[23,0.8881],[24,0.8826],[25,0.8785],[26,0.8728],[27,0.8644],[28,0.8579],[29,0.8511],[30,0.8494],[31,0.8453],[32,0.8386],[33,0.8422],[34,0.8306],[35,0.829],[36,0.8169],[37,0.8177],[38,0.8035],[39,0.795],[40,0.7951]],"CD-2":[[1,1.161],[2,1.072],[3,1.052],[4,1.045],[5,1.036],[6,0.9942],[7,0.9847],[8,1.01],[9,1.019],[10,1.025],[11,1.028],[12,1.016],[13,1.021],[14,1.014],[15,1.011],[16,1.005],[17,1.008],[18,0.9991],[19,0.9973],[20,0.9966],[21,0.9912],[22,0.9875],[23,0.987],[24,0.9825],[25,0.9778],[26,0.9725],[27,0.9706],[28,0.9667],[29,0.9597],[30,0.9581],[31,0.9525],[32,0.9526],[33,0.9487],[34,0.9466],[35,0.9391],[36,0.9335],[37,0.9232],[38,0.9191],[39,0.9048],[40,0.8991]]},"flats":{}}};

  var hidden = new Set();

  var W = 480, H = 390, ML = 62, MR = 14, MT = 14, MB = 46;
  var PW = W - ML - MR, PH = H - MT - MB;

  var SBChart = /** @type {any} */ (function () {
    function C() { return Reflect.construct(HTMLElement, [], C); }
    C.prototype = Object.create(HTMLElement.prototype);
    C.prototype.connectedCallback = function () {
      var self = this;
      this._panel = PANELS[this.getAttribute('panel') || 'mean'] || PANELS.mean;
      this.style.display = 'block';
      this.style.position = 'relative';
      this.render();
      this._onToggle = function () { self.render(); };
      window.addEventListener('sb-legend-toggle', this._onToggle);
    };
    C.prototype.disconnectedCallback = function () {
      window.removeEventListener('sb-legend-toggle', this._onToggle);
    };
    C.prototype.sx = function (v) {
      var p = this._panel;
      if (p.xlog) {
        var lmin = Math.log10(p.xmin), lmax = Math.log10(p.xmax);
        return ML + (Math.log10(v) - lmin) / (lmax - lmin) * PW;
      }
      return ML + (v / p.xmax) * PW;
    };
    C.prototype.sy = function (v) {
      var p = this._panel;
      return MT + PH - (v - p.ymin) / (p.ymax - p.ymin) * PH;
    };
    C.prototype.render = function () {
      var self = this, p = this._panel;
      var accent = this.getAttribute('accent') || '#1a1a1a';
      var s = '';
      p.yticks.forEach(function (v) {
        var y = self.sy(v);
        s += '<line x1="' + ML + '" y1="' + y + '" x2="' + (W - MR) + '" y2="' + y + '" stroke="#e3e3e0" stroke-width="1"/>';
        s += '<text x="' + (ML - 8) + '" y="' + (y + 3.5) + '" text-anchor="end" font-size="11" fill="#8a8a86">' + v + '</text>';
      });
      p.xticks.forEach(function (v) {
        var x = self.sx(p.xlog ? Math.max(v, p.xmin) : v);
        s += '<line x1="' + x + '" y1="' + (MT + PH) + '" x2="' + x + '" y2="' + (MT + PH + 4) + '" stroke="#8a8a86" stroke-width="1"/>';
        s += '<text x="' + x + '" y="' + (MT + PH + 17) + '" text-anchor="middle" font-size="11" fill="#8a8a86">' + v + '</text>';
      });
      s += '<rect x="' + ML + '" y="' + MT + '" width="' + PW + '" height="' + PH + '" fill="none" stroke="#3a3a37" stroke-width="1"/>';
      if (p.refline != null) {
        var ry = self.sy(p.refline);
        s += '<line x1="' + ML + '" y1="' + ry + '" x2="' + (W - MR) + '" y2="' + ry + '" stroke="#1a1a1a" stroke-width="1.4"/>';
      }
      METHODS.forEach(function (m) {
        if (hidden.has(m.id)) return;
        var pts = p.series[m.id];
        if (pts && pts.length) {
          var d = pts.map(function (q, i) { return (i ? 'L' : 'M') + self.sx(q[0]).toFixed(1) + ' ' + self.sy(q[1]).toFixed(1); }).join(' ');
          s += '<path d="' + d + '" fill="none" stroke="' + m.color + '" stroke-width="1.8"' + (m.few ? ' stroke-dasharray="' + m.dash + '"' : '') + '/>';
          if (pts.length < 20) pts.forEach(function (q) {
            s += '<circle cx="' + self.sx(q[0]).toFixed(1) + '" cy="' + self.sy(q[1]).toFixed(1) + '" r="2.6" fill="' + m.color + '"/>';
          });
        } else if (p.flats && p.flats[m.id] != null) {
          var y2 = self.sy(p.flats[m.id]);
          s += '<line x1="' + ML + '" y1="' + y2 + '" x2="' + (W - MR) + '" y2="' + y2 + '" stroke="' + m.color + '" stroke-width="1.8" stroke-dasharray="' + m.dash + '"/>';
        }
      });
      s += '<text x="' + (ML + PW / 2) + '" y="' + (H - 10) + '" text-anchor="middle" font-size="12" fill="#3a3a37">' + p.xlabel + '</text>';
      s += '<text transform="translate(14 ' + (MT + PH / 2) + ') rotate(-90)" text-anchor="middle" font-size="12" fill="#3a3a37">' + p.ylabel + '</text>';
      s += '<line class="sbx" x1="0" y1="' + MT + '" x2="0" y2="' + (MT + PH) + '" stroke="' + accent + '" stroke-width="1" stroke-dasharray="3 3" opacity="0"/>';

      this.innerHTML =
        '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:auto;display:block;font-family:inherit">' + s + '</svg>' +
        '<div class="sbtip" style="position:absolute;pointer-events:none;opacity:0;background:#1a1a1a;color:#f4f4f2;border-radius:6px;padding:8px 10px;font-size:11px;line-height:1.5;white-space:nowrap;z-index:5;transition:opacity .12s"></div>';
      this.bindHover();
    };
    C.prototype.bindHover = function () {
      var self = this, p = this._panel;
      var svg = this.querySelector('svg'), tip = this.querySelector('.sbtip'), xline = this.querySelector('.sbx');
      function dataX(mx) {
        if (p.xlog) {
          var lmin = Math.log10(p.xmin), lmax = Math.log10(p.xmax);
          return Math.pow(10, lmin + (mx - ML) / PW * (lmax - lmin));
        }
        return (mx - ML) / PW * p.xmax;
      }
      svg.addEventListener('mousemove', function (e) {
        var r = svg.getBoundingClientRect();
        var mx = (e.clientX - r.left) / r.width * W;
        if (mx < ML || mx > W - MR) { tip.style.opacity = 0; xline.setAttribute('opacity', 0); return; }
        var xv = dataX(mx);
        var rows = '', px = null, hasFlat = false, shownX = null;
        METHODS.forEach(function (m) {
          if (hidden.has(m.id)) return;
          var pts = p.series[m.id], v = null;
          if (pts && pts.length) {
            var best = 0, bd = 1e18;
            pts.forEach(function (q, i) { var d = Math.abs(q[0] - xv); if (d < bd) { bd = d; best = i; } });
            v = pts[best][1];
            if (shownX == null || Math.abs(pts[best][0] - xv) < Math.abs(shownX - xv)) { shownX = pts[best][0]; }
          } else if (p.flats && p.flats[m.id] != null) { v = p.flats[m.id]; hasFlat = true; }
          if (v == null) return;
          var flat = !(pts && pts.length);
          rows += '<div><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:' + m.color + ';margin-right:6px"></span>' + m.id + (flat ? '*' : '') + ' — ' + (+v).toFixed(p.fmt) + '</div>';
        });
        if (shownX == null) { tip.style.opacity = 0; xline.setAttribute('opacity', 0); return; }
        px = self.sx(shownX);
        xline.setAttribute('x1', px); xline.setAttribute('x2', px); xline.setAttribute('opacity', 0.6);
        var xname = p.xlabel === 'Wavenumber k' ? 'k ≈ ' + (+shownX).toFixed(1) : (p.xlabel === 'Rollout step' ? 'Rollout step ' + Math.round(shownX) : Math.round(shownX) + ' steps');
        tip.innerHTML = '<div style="font-weight:600;margin-bottom:2px">' + xname + '</div>' + rows + (hasFlat ? '<div style="opacity:.55;margin-top:2px">* single/few-step</div>' : '');
        var tx = px / W * r.width + 12;
        if (tx > r.width - 150) tx = px / W * r.width - 150;
        tip.style.left = tx + 'px';
        tip.style.top = Math.min((e.clientY - r.top) + 10, r.height - 140) + 'px';
        tip.style.opacity = 1;
      });
      svg.addEventListener('mouseleave', function () { tip.style.opacity = 0; xline.setAttribute('opacity', 0); });
    };
    return C;
  })();
    customElements.define('sb-chart', SBChart);

  var SBLegend = /** @type {any} */ (function () {
    function L() { return Reflect.construct(HTMLElement, [], L); }
    L.prototype = Object.create(HTMLElement.prototype);
    L.prototype.connectedCallback = function () { this.render(); };
    L.prototype.render = function () {
      var self = this;
      var dark = this.getAttribute('theme') === 'dark';
      this.style.display = 'flex';
      this.style.flexWrap = 'wrap';
      this.style.gap = '8px';
      this.innerHTML = '';
      METHODS.forEach(function (m) {
        var off = hidden.has(m.id);
        var b = document.createElement('button');
        var sw = document.createElement('span');
        sw.innerHTML = '<svg width="26" height="4" style="display:block"><line x1="0" y1="2" x2="26" y2="2" stroke="' + m.color + '" stroke-width="2.5"' + (m.few ? (m.dash === '2 3' ? ' stroke-dasharray="2.5 3.5"' : ' stroke-dasharray="8 4"') : '') + '/></svg>';
        var lab = document.createElement('span');
        lab.textContent = m.id;
        b.appendChild(sw); b.appendChild(lab);
        b.style.cssText = 'display:inline-flex;align-items:center;gap:7px;padding:5px 11px;border-radius:5px;cursor:pointer;font:inherit;font-size:12px;' +
          'border:1px solid ' + (dark ? '#3d3d3a' : '#d8d8d4') + ';' +
          'background:' + (dark ? '#242422' : '#fff') + ';color:' + (dark ? '#e8e8e4' : '#2a2a28') + ';' +
          'opacity:' + (off ? 0.35 : 1) + ';transition:opacity .15s';
        b.title = off ? 'Show ' + m.id : 'Hide ' + m.id;
        b.addEventListener('click', function () {
          if (hidden.has(m.id)) hidden.delete(m.id); else hidden.add(m.id);
          window.dispatchEvent(new CustomEvent('sb-legend-toggle'));
          document.querySelectorAll('sb-legend').forEach(function (el) { el.render && el.render(); });
        });
        self.appendChild(b);
      });
    };
    return L;
  })();
  customElements.define('sb-legend', SBLegend);

  /* ---------------- baselines: full-width legend with descriptions ---------------- */
  var GROUPS = [
    { label: 'Multi-step samplers (10\u2013400 steps)', items: [
      { id: 'FM',    desc: 'Flow Matching, OT-path ODE' },
      { id: 'DPM-2', desc: 'Diffusion, 2nd-order exponential integrator' },
      { id: 'DDIM',  desc: 'Diffusion, probability-flow ODE' },
      { id: 'DDPM',  desc: 'Diffusion, reverse SDE' },
      { id: 'SI',    desc: 'Stochastic interpolant, SDE bridge' }
    ]},
    { label: 'Few-step distillation (1\u20132 steps)', items: [
      { id: 'ADD-FM', desc: 'Adversarial distillation, 10-step FM teacher' },
      { id: 'CD-1',   desc: 'Consistency distillation, 1 step' },
      { id: 'CD-2',   desc: 'Consistency distillation, 2-step schedule' }
    ]}
  ];
  function methodOf(id) { for (var i = 0; i < METHODS.length; i++) if (METHODS[i].id === id) return METHODS[i]; }

  var SBBaselines = /** @type {any} */ (function () {
    function B() { return Reflect.construct(HTMLElement, [], B); }
    B.prototype = Object.create(HTMLElement.prototype);
    B.prototype.connectedCallback = function () {
      var self = this;
      this.render();
      this._onToggle = function () { self.render(); };
      window.addEventListener('sb-legend-toggle', this._onToggle);
    };
    B.prototype.disconnectedCallback = function () {
      window.removeEventListener('sb-legend-toggle', this._onToggle);
    };
    B.prototype.render = function () {
      var self = this;
      this.style.display = 'grid';
      this.style.gridTemplateColumns = 'repeat(4,1fr)';
      this.style.gap = '26px';
      this.style.alignItems = 'start';
      this.innerHTML = '';
      GROUPS.forEach(function (g) {
        g.items.forEach(function (it) {
          var m = methodOf(it.id), off = hidden.has(it.id);
          var b = document.createElement('button');
          b.style.cssText = 'display:grid;grid-template-columns:30px 1fr;gap:4px 9px;align-items:baseline;text-align:left;padding:0;border:none;background:none;cursor:pointer;font:inherit;opacity:' + (off ? 0.35 : 1) + ';transition:opacity .15s';
          b.title = (off ? 'Show ' : 'Hide ') + it.id + ' in all plots';
          var sw = document.createElement('span');
          sw.style.cssText = 'align-self:center';
          sw.innerHTML = '<svg width="30" height="4" style="display:block"><line x1="1" y1="2" x2="29" y2="2" stroke="' + m.color + '" stroke-width="2.5"' + (m.few ? (m.dash === '2 3' ? ' stroke-dasharray="2.5 3.5" stroke-linecap="butt"' : ' stroke-dasharray="8 4"') : '') + '/></svg>';
          var nm = document.createElement('strong');
          nm.style.cssText = 'font-size:13.5px;color:#1f1f1d;line-height:1.2';
          nm.textContent = it.id;
          var d = document.createElement('span');
          d.style.cssText = 'font-size:12px;line-height:1.45;color:#5a5a56;grid-column:2';
          d.textContent = it.desc;
          b.appendChild(sw); b.appendChild(nm); b.appendChild(d);
          b.addEventListener('click', function () {
            if (hidden.has(it.id)) hidden.delete(it.id); else hidden.add(it.id);
            window.dispatchEvent(new CustomEvent('sb-legend-toggle'));
            document.querySelectorAll('sb-legend').forEach(function (el) { el.render && el.render(); });
          });
          self.appendChild(b);
        });
      });
    };
    return B;
  })();
  customElements.define('sb-baselines', SBBaselines);
})();

/* ka-tex: minimal KaTeX renderer element */
(function () {
  if (customElements.get('ka-tex')) return;
  customElements.define('ka-tex', /** @type {any} */ (function () {
    function K() { return Reflect.construct(HTMLElement, [], K); }
    K.prototype = Object.create(HTMLElement.prototype);
    K.prototype.connectedCallback = function () {
      var self = this;
      (function attempt() {
        if (window.katex) {
          try { window.katex.render(self.getAttribute('tex') || '', self, { throwOnError: false }); } catch (e) {}
        } else { setTimeout(attempt, 120); }
      })();
    };
    return K;
  })());
})();
