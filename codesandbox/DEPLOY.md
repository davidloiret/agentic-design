1. sudo ./scripts/setup-host-network.sh bridge-setup fcbridge
2. make all
3. sudo ./start.sh



/etc/cni/conf.d/fcnet.conflist:
CNI

{

  "name": "fcnet",

  "cniVersion": "0.4.0",

  "plugins": [

    {

      "type": "ptp",

      "ipMasq": true,

      "ipam": {

        "type": "host-local",

        "subnet": "192.168.127.0/24",

        "resolvConf": "/etc/resolv.conf"

      }

    },

    {

      "type": "tc-redirect-tap"

    }

  ]

}
